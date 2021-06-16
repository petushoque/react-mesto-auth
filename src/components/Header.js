import React from 'react';
import logo from '../images/logo-mesto.svg';

function Header (props) {
    console.log(props)
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта" />
            <div class="header__auth">
                {props.isLoggedIn ? (<p>{localStorage.getItem('email')}</p>) : null}
                
                <p onClick={() => props.onLogout()}>Logout</p>
            </div>
        </header>
    )
}

export default Header