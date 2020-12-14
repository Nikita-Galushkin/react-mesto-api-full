import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isModal={true}
      name={'edit-profile'} 
      title={'Редактировать профиль'} 
      children={
        <>
          <label>
            <input type="text" value={name || ''} onChange={handleChangeName} className="modal__item modal__item_type_name" name="name" placeholder="ФИО" required minLength="2" maxLength="40" />
            <span id="name-error" className="modal__item-error"></span>
          </label>
          <label>
            <input type="text" value={description || ''} onChange={handleChangeDescription} className="modal__item modal__item_type_profession" name="about" placeholder="Профессия" required minLength="2" maxLength="200" />
            <span id="about-error" className="modal__item-error"></span>
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

export default EditProfilePopup;