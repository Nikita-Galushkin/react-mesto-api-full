import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const inputNameRef = React.useRef('');
  const inputLinkRef = React.useRef('');
  
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value
    });
  } 

  return (
    <PopupWithForm 
      isModal={true}
      name={'add-card'} 
      title={'Новое место'} 
      children={
        <>
          <label>
            <input ref={inputNameRef} type="text" className="modal__item modal__item_type_place" name="name" defaultValue="" placeholder="Название" required minLength="1" maxLength="30" />
            <span id="name-error" className="modal__item-error"></span>
          </label>
          <label>
            <input ref={inputLinkRef} type="url" className="modal__item modal__item_type_link-place" name="link" defaultValue="" placeholder="Ссылка на картинку" required />
            <span id="link-error" className="modal__item-error"></span>
          </label>
        </>
      } 
      text={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;