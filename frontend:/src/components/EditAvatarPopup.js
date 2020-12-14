import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  } 

  return (
    <PopupWithForm 
      isModal={true}
      name={'update-avatar'} 
      title={'Обновить аватар'} 
      children={
        <>
          <label>
            <input ref={inputRef} type="url" className="modal__item modal__item_type_avatar" name="avatar" defaultValue="" placeholder="Ссылка на фото" required />
            <span id="avatar-error" className="modal__item-error"></span>
          </label>
        </>
      } 
      text={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;