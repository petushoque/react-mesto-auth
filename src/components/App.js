import React, { useEffect } from 'react';
import { useState } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

import * as auth from '../auth'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'

function App (props) {

  const [currentUser, setCurrentUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck () {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt')
      auth.checkToken(jwt).then((res) => {
        if (res) {
          let userData = {
            username: res.username,
            email: res.email,
          }
          setLoggedIn(true)
          setUserData(userData)
          props.history.push('./')
        }
      })
    }
  }

  function handleLogin () {
    setLoggedIn(true)
  }

  useEffect(() => {
    api.getUserInfo()
    .then((result) => {
        setCurrentUser(result)
    })
    .catch((err) => {
        console.log(err);
    })
  }, [])
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePostPopupOpen, setIsDeletePostPopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards, setCards] = useState([])

  useEffect(() => {        
    api.getCards()
    .then((result) => {
        const data = result.map((item) => 
            ({
                id: item._id,
                name: item.name,
                link: item.link,
                owner: item.owner._id,
                likes: item.likes,
            })
        )
        setCards(data)
    })
    .catch((err) => {
        console.log(err);
    });    
  }, [])

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false)
    setIsDeletePostPopup(false)
    setSelectedCard(null)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleUpdateUser (name, about) {
    api.patchProfileInfo(name, about)
    .then((res) => setCurrentUser(res))
    closeAllPopups()
  }

  function handleUpdateUser (avatarLink) {
    api.patchProfileAvatar(avatarLink)
    .then((res) => setCurrentUser(res))
    closeAllPopups()
  }

  function handleAddPlace (description, link) {
    api.postNewCard(description, link)
    .then((newCard) => {
      const data = {
        id: newCard._id,
        name: newCard.name,
        link: newCard.link,
        owner: newCard.owner._id,
        likes: newCard.likes,
      }
      setCards([data, ...cards])})
    closeAllPopups()
  }

  function handleCardDelete(card) {
    api.deleteCard(card.id)
    .then(
        setCards((cards) => cards.filter((c) => {return c.id !== card.id}))
    )
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
        api.deleteLikePost(card.id)
        .then((newCard) => {
                const data = {
                        id: newCard._id,
                        name: newCard.name,
                        link: newCard.link,
                        owner: newCard.owner._id,
                        likes: newCard.likes,
                    }
                setCards((cards) => cards.map((c) => c.id === card.id ? data : c))
        })
    }
    else {
        api.putLikePost(card.id)
        .then((newCard) => {
            const data = {
                id: newCard._id,
                name: newCard.name,
                link: newCard.link,
                owner: newCard.owner._id,
                likes: newCard.likes,
            }
            setCards((cards) => cards.map((c) => c.id === card.id ? data : c))
        })    
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>   
        <Header />
        <Switch>
        <Login />
        <Register />
        <ProtectedRoute exact path='./'>
        <Main 
          cards={cards}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          handleCardDelete={handleCardDelete}
          hanldeCardLike={handleCardLike}/>
        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}/>

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateUser}/>

        <PopupWithForm name='delete-post' title='Вы уверены?' isOpen={isDeletePostPopupOpen} onClose={closeAllPopups}>
        </PopupWithForm> 
             
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}/>
        </ProtectedRoute>
        </Switch>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default withRouter(App)
/*
<section class="popup popup_type_delete-post">
<div class="popup__container">
  <h2 class="popup__title popup__title_small">Вы уверены?</h2>
  <form name="deletepost">
    <button class="popup__save-button popup__save-button_active" type="submit">Да</button>
  </form>
  <button class="popup__close-button popup__close-button_type_delete-post" type="button"></button>
</div>
</section>
*/