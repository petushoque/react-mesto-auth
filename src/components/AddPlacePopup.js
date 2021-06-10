import { React, useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup (props) {
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(description, link);
    }

    return (
        <PopupWithForm 
            name='add-post' 
            title='Новое место' 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input 
                onInput={(e) => setDescription(e.target.value)}
                className="popup__input popup__input_textarea_signature" 
                id="input-signature" 
                name="signature" 
                type="text" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30"/>
            <span className="popup__input-error input-signature-error"></span>
            <input 
                onInput={(e) => setLink(e.target.value)}
                className="popup__input popup__input_textarea_picture" 
                id="input-picture" 
                name="picture" 
                type="url" 
                placeholder="Ссылка на картинку" 
                required />
            <span className="popup__input-error input-picture-error"></span>
        </PopupWithForm>
    )

}