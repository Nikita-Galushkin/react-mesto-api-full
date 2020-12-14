import React from 'react';
import { Link } from "react-router-dom";

function AuthForm({ title, text, active, children, onSubmit }) {
  return (
    <div className="auth"> 
      <div className="auth__container">
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form" onSubmit={onSubmit} action="#" noValidate>
          {children}
          <button type="submit" className="auth__button">{text}</button>
        </form>
        <p className={`auth__text ${active}`}>Уже зарегистрированы? <Link to="/signin" className="auth__link">Войти</Link></p>
      </div>
    </div> 
  );
}

export default AuthForm;