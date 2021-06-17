import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../images/logo-mesto.svg';

function Header (props) {
    return (
        <header className="header">
            <Link to="/"><img className="header__logo" src={logo} alt="Логотип сайта" /></Link>
            <div class="header__auth">
                {props.isLoggedIn ? 
                (<p className="header__auth-item header__auth-item_email">{localStorage.getItem('email')}</p>) : 
                null}                
                <p className="header__auth-item header__auth-item_logout" onClick={() => props.onLogout()}>Logout</p>
            </div>
        </header>
    )
}

export default Header