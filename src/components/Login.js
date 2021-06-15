import React from 'react'
import { useState } from 'react'

export default function Login (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleInput (e) {
        switch (e.target.id) {
            case 'login-password':
                setPassword(e.target.value)
                break;
            case 'login-email':
                setEmail(e.target.value)
                break;
            }
    }

    return (
            <form className='authorization'>
                <h2 className='authorization__title'>Вход</h2>
                <input 
                    className='authorization__input'
                    id='login-email'
                    placeholder='Email'
                    required
                    type='email' 
                    onInput={e => handleInput(e)}  
                />
                <input 
                    className='authorization__input'
                    id='login-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                    onInput={e => handleInput(e)}
                />
                <button
                    className='authorization__submit-button authorization__submit-button_login' 
                    type='submit'>
                        Войти
                </button>
            </form>
    )
}