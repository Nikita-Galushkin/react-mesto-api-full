import React from 'react';
import AuthForm from './AuthForm.js';

function Register({ onRegister }) {
  const [ data, setData ] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = data;
    onRegister(email, password);
  }


  return (
    <AuthForm 
      title={'Регистрация'}
      text={'Зарегистрироваться'}
      active={'auth__text_active'}
      children={
        <>
          <label>
            <input type="email" value={data.email} className="auth__item auth__item_type_email" name="email" onChange={handleChange} placeholder="Email" required minLength="2" maxLength="40" />
            <span id="email-error" className="auth__item-error"></span>
          </label>
          <label>
            <input type="password" value={data.password} className="auth__item auth__item_type_password" name="password" onChange={handleChange} placeholder="Пароль" required minLength="2" maxLength="200" />
            <span id="password-error" className="auth__item-error"></span>
          </label>
        </>
      }
      onSubmit={handleSubmit}
    />
  );
}

export default Register;