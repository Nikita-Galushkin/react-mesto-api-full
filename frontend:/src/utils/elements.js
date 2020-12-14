const openEditButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.modal__close-button_type_edit');
const editModal = document.querySelector('.modal_type_edit-profile');
const editFormButton = editModal.querySelector('.modal__button_action');

const openAddButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.modal__close-button_type_add');
const addModal = document.querySelector('.modal_type_add-card');
const addFormButton = addModal.querySelector('.modal__button_action');

const closePhotoButton = document.querySelector('.modal__close-button_type_photo');
const photoModal = document.querySelector('.modal_type_photo');

const openAvatarButton = document.querySelector('.profile__image-button');
const avatarModal = document.querySelector('.modal_type_update-avatar');
const avatarImage = document.querySelector('.profile__image');

const confirmModal = document.querySelector('.modal_type_confirm');

const nameText = document.querySelector('.profile__title');
const aboutText = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('#element-template').content;
const elementContainer = document.querySelector('.elements__list');
const likeCounter = document.querySelector('.element__counter');

const formAddModal = document.forms.modal_add_form;
const placeFormAdd = formAddModal.elements.place;
const linkPlaceFormAdd = formAddModal.elements.link_place;

const formEditModal = document.forms.modal_edit_form;
const nameFormEdit = formEditModal.elements.name;
const aboutFormEdit = formEditModal.elements.about;

const formAvatarModal = document.forms.modal_avatar_form;
const avatarFormButton = formAvatarModal.querySelector('.modal__button');

const obj = {
  formSelector: '.modal__form',
  inputSelector: '.modal__item',
  buttonSubmitSelector: '.modal__button',
  errorClass: 'modal__item-error_active',
  buttonDisabledClass: 'modal__button_disabled',
  inputTypeErrorClass: 'modal__item_type_error'
};

export {
  openEditButton, closeEditButton, editModal, editFormButton,
  openAddButton, closeAddButton, addModal, addFormButton,
  closePhotoButton, photoModal,
  nameText, aboutText, elementTemplate, elementContainer,
  formAddModal, placeFormAdd, linkPlaceFormAdd, formEditModal,
  nameFormEdit, aboutFormEdit, formAvatarModal, openAvatarButton,
  avatarModal, confirmModal, avatarImage, likeCounter, avatarFormButton, obj
  };