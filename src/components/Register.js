import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit (e) {
        e.preventDefault();
        props.onRegister(email, password)
    }

    return (
            <form className='authorization'
            onSubmit={handleSubmit}>
                <h2 className='authorization__title'>Регистрация</h2>
                <input 
                    className='authorization__input'
                    id='registration-email'
                    placeholder='Email'
                    required
                    type='email'   
                    onChange={e => setEmail(e.target.value)}
                    value={email || ''}
                />
                <input 
                    className='authorization__input'
                    id='registration-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                    onChange={e => setPassword(e.target.value)}
                    value={password || ''}
                />
                <button
                    className='authorization__submit-button authorization__submit-button_login' 
                    type='submit'>
                        Зарегистрироваться
                </button>
                <p className='authorization__notice'>
                    Уже зарегистрированы? <Link className='authorization__link' to='/login'>Войти</Link>
                </p>
            </form>
    )
}