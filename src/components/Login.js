import React from 'react'
import { useState } from 'react'

export default function Login (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit (e) {
        e.preventDefault();
        props.onLogin(email, password)
    }

    return (
            <form className='authorization' onSubmit={handleSubmit}>
                <h2 className='authorization__title'>Вход</h2>
                <input 
                    className='authorization__input'
                    id='login-email'
                    placeholder='Email'
                    required
                    type='email' 
                    onChange={e => setEmail(e.target.value)}
                    value={email || ''}  
                />
                <input 
                    className='authorization__input'
                    id='login-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                    onChange={e => setPassword(e.target.value)}
                    value={password || ''}
                />
                <button
                    className='authorization__submit-button authorization__submit-button_login' 
                    type='submit'>
                        Войти
                </button>
            </form>
    )
}