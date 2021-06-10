import { React, useRef } from 'react';
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup (props) {

    const avatarLink = useRef()

    function handleSubmit(e) {
        e.preventDefault();      
        props.onUpdateAvatar(avatarLink.current.value);
      } 

    return (
        <PopupWithForm 
            name='edit-avatar' 
            title='Обновить аватар' 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input 
                className="popup__input popup__input_textarea_avatar" 
                id="input-avatar" 
                name="avatar" 
                type="url" 
                placeholder="Ссылка на картинку" 
                ref={avatarLink}
                required />
            <span className="popup__input-error input-avatar-error"></span>
        </PopupWithForm>
    )
}