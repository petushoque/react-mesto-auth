import React from 'react'

export default function Register (props) {
    return (
            <form className='authorization'>
                <h2 className='authorization__title'>Регистрация</h2>
                <input 
                    className='authorization__input'
                    id='registration-email'
                    placeholder='Email'
                    required
                    type='email'   
                />
                <input 
                    className='authorization__input'
                    id='registration-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                />
                <button
                    className='authorization__submit-button authorization__submit-button_login' 
                    type='submit'>
                        Зарегистрироваться
                </button>
                <p className='authorization__notice'>
                    Уже зарегистрированы? Войти
                </p>
            </form>
    )
}