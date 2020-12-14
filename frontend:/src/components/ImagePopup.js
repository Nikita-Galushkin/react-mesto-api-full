import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`modal modal_type_photo ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container-photo">
        <button className="modal__close-button modal__close-button_type_photo" type="button" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="modal__photo" />
        <p className="modal__text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;