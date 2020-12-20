import React from 'react';
import PopupWithForm from './PopupWithForm';

function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <PopupWithForm
      isModal={false}
      name={'auth'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <img src={message.icon} alt='Иконка авторизации' className='modal__tooltip-icon' />
      <p className='modal__tooltip-text'>{message.text}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;