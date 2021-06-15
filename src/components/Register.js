import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register (props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleInput (e) {
        switch (e.target.id) {
            case 'registration-password':
                setPassword(e.target.value)
                break;
            case 'registration-email':
                setEmail(e.target.value)
                break;
            }
    }

    return (
            <form className='authorization'>
                <h2 className='authorization__title'>Регистрация</h2>
                <input 
                    className='authorization__input'
                    id='registration-email'
                    placeholder='Email'
                    required
                    type='email'   
                    onInput={e => handleInput(e)}
                />
                <input 
                    className='authorization__input'
                    id='registration-password'
                    placeholder='Пароль'
                    required
                    type='password'   
                    onInput={e => handleInput(e)}
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