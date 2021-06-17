import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import logo from '../images/logo-mesto.svg';

function Header (props) {

    const loc = useLocation()

    return (
        <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="Логотип сайта" /></Link>
            <div className="header__auth">
                {props.isLoggedIn ? 
                (<p className="header__auth-item header__auth-item_email">{localStorage.getItem('email')}</p>) : 
                null} 
                {loc.pathname==='/' &&
                <p 
                    className="header__auth-item header__auth-item_logout" 
                    onClick={() => props.onLogout()}>
                        Выйти
                </p>
                }            
                {loc.pathname==="/sign-in" &&
                <Link to="/sign-up" className="header__auth-item header__auth-item_login">
                        Регистрация
                </Link>
                }    
                {loc.pathname==="/sign-up" &&
                <Link to="/sign-in" className="header__auth-item header__auth-item_login">
                        Войти
                </Link>
                }      
            </div>
        </header>
    )
}

export default Header