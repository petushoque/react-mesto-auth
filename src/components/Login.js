import React from 'react'

export default function Login (props) {
    return (
            <form className='authorization'>
                <h2 className='authorization__title'>Вход</h2>
                <input 
                    className='authorization__input'
                    id='login-email'
                    placeholder='Email'
                    required
                    type='email'   
                />
                <input 
                    className='authorization__input'
                    id='login-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                />
                <button
                    className='authorization__submit-button authorization__submit-button_login' 
                    type='submit'>
                        Войти
                </button>
            </form>
    )
}