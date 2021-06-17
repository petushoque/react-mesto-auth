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
                {loc.pathname==="/login" &&
                <Link to="/register" className="header__auth-item header__auth-item_login">
                        Регистрация
                </Link>
                }    
                {loc.pathname==="/register" &&
                <Link to="/login" className="header__auth-item header__auth-item_login">
                        Войти
                </Link>
                }      
            </div>
        </header>
    )
}

export default Header