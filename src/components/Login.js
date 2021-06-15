import React from 'react'
import { useState } from 'react'

export default function Login (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
            <form className='authorization'>
                <h2 className='authorization__title'>Вход</h2>
                <input 
                    className='authorization__input'
                    id='login-email'
                    placeholder='Email'
                    required
                    type='email' 
                    onInput={e => setEmail(e.target.value)}  
                />
                <input 
                    className='authorization__input'
                    id='login-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                    onInput={e => setPassword(e.target.value)}
                />
                <button
                    className='authorization__submit-button authorization__submit-button_login' 
                    type='submit'>
                        Войти
                </button>
            </form>
    )
}