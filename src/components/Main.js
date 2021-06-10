import { React, useState, useEffect, useContext } from 'react'
import api from '../utils/api'
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main (props) {

    const user = useContext(CurrentUserContext)

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${user.avatar})` }} ></div>  
                <div className="profile__user">      
                    <h1 className="profile__name">{user.name}</h1>
                    <button className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                </div>
                <p className="profile__status">{user.about}</p>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>

            <section className="elements">
                {props.cards.map(card => (<Card 
                                        key={card.id} 
                                        {...card} 
                                        onCardClick={props.onCardClick} 
                                        onCardLike={props.hanldeCardLike}
                                        onCardDelete={props.handleCardDelete}/>))}
            </section>

        </main>
    )
}

export default Main