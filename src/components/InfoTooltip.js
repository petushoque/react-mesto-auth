export default function InfoTooltip(props) {
    const isOpen = props.isOpen;
    return (
        <section className={isOpen ? `popup popup_type_register popup_active` : `popup popup_type_register`}>
            <div className="popup__container">
                <div className={`popup__register-status ${props.isSuccess ? 'popup__register-status_good' : 'popup__register-status_bad'}`}>
                </div>
                <h2 className="popup__title popup__title_register">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>          
                <button className={`popup__close-button`} onClick={() => props.onClose()} type="button"></button>
            </div>
        </section>
    )
}