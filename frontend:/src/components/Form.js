import React from 'react';

function Form({ isModal, name, title, children, text, onSubmit }) {
  return (
    <>
      {
        isModal && (<h2 className="modal__title">{title}</h2>)
      }
      <form className="modal__form" onSubmit={onSubmit} action="#" name={`modal_${name}_form`} noValidate>
        {children}
        {
          isModal && (<button type="submit" className="modal__button modal__button_action">{text}</button>)
        }
      </form>
    </>
  );
}

export default Form;