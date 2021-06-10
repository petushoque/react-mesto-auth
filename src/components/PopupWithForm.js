import React from 'react';

function PopupWithForm (props) {
    const popupName = props.name;
    const title = props.title;
    const isOpen = props.isOpen;
    const closePopup = props.onClose;
    return (
        <section className={isOpen ? `popup popup_type_${popupName} popup_active` : `popup popup_type_${popupName}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form name={popupName} noValidate onSubmit={props.onSubmit}>
                    {props.children}
                <button className="popup__save-button popup__save-button_active" type="submit">Сохранить</button>
                </form>                
                <button className={`popup__close-button popup__close-button_type_${popupName}`} onClick={closePopup} type="button"></button>
            </div>
        </section>
    )
}

export default PopupWithForm
