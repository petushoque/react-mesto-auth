import { React, useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function EditProfilePopup (props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
    } 
    
    return (
        <PopupWithForm 
            name='edit-profile' 
            title='Редактировать профиль' 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input 
                className="popup__input popup__input_textarea_name" 
                id="input-name" 
                name="username" 
                type="text" 
                placeholder="Введите имя"
                defaultValue={name}
                onInput={(e) => setName(e.target.value)}
                required minLength="2" 
                maxLength="40" />
            <span className="popup__input-error input-name-error"></span>
            <input 
                className="popup__input popup__input_textarea_status" 
                id="input-status" 
                name="status" 
                type="text" 
                placeholder="Введите статус"
                defaultValue={description}
                onInput={(e) => setDescription(e.target.value)} 
                required minLength="2" 
                maxLength="200" />
            <span className="popup__input-error input-status-error"></span>
        </PopupWithForm> 
    )
}