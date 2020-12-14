import React from 'react';
import Form from './Form';

function PopupWithForm({ isModal, name, title, children, text, isOpen, onClose, onSubmit }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button className="modal__close-button" type="button" onClick={onClose}></button>
        <Form
          isModal={isModal}
          name={name}
          title={title}
          children={children}
          text={text}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;