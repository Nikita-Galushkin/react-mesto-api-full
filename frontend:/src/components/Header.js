import React from 'react';
import logoImage from '../images/logo-header.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onLogout }) {
  const { pathname } = useLocation();
  const linkText = `${pathname === '/signin' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/signin' ? '/signup' : '/signin'}`;

  return (
    <header className="header page__header section">
      <img className="logo header__logo" src={logoImage} alt="Логотип" />
      {loggedIn ? (
        <div className='auth-info'>
          <span>{email}</span>
          <button className='auth-info__signout' onClick={onLogout}>Выйти</button>
        </div>
        )
        : (<Link to={linkPath} className="link">{linkText}</Link>)
      }
    </header>
  );
}

export default Header;