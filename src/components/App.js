import React, { useEffect } from 'react';
import { useState } from 'react';
import { Redirect, Route, Switch, withRouter, useHistory } from 'react-router-dom';

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
  const history = useHistory()

  
  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (loggedIn) {
      history.push('/')
    }
  }, [loggedIn])

  function tokenCheck () {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return
    }
    auth
      .checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true)
        }
      })
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

  function handleLogin (email, password) {
    return auth
    .authorize(email, password)
    .then((res) => {
      if (res) {
        localStorage.setItem('jwt', res.token)
        localStorage.setItem('email', email)
        setLoggedIn(true)
      }
    })
  }

  function handleRegister (email, password) {
    return auth
    .register(email, password)
    .then(() => history.push('/login'))
  }

  function handleLogout () {
    setLoggedIn(false)
    localStorage.setItem('jwt', null)
  }

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
        <Header 
          isLoggedIn={loggedIn}
          onLogout={handleLogout}/>
        <Switch>
        <ProtectedRoute 
          exact path='/'
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          handleCardDelete={handleCardDelete}
          hanldeCardLike={handleCardLike}>
        </ProtectedRoute>
        <Route path='/login'>
          <Login onLogin={handleLogin}/>
        </Route>
        <Route path='/register'>
          <Register onRegister={handleRegister} />
        </Route>
        <Route>
          {loggedIn ? <Redirect to='/'/> : <Redirect to='/login'/>}
        </Route>
        </Switch>
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
        <PopupWithForm 
          name='delete-post' 
          title='Вы уверены?' 
          isOpen={isDeletePostPopupOpen} 
          onClose={closeAllPopups}>
        </PopupWithForm>             
        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App