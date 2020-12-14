import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = (card.owner._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__trash_active' : ''}`
  );

  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__group_active' : ''}`
  );
  
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <button className="element__photo" type="button" onClick={handleClick}>
        <img src={card.link} alt="фото" className="element__image" />
      </button>
      <div className="element__info-container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={`element__group ${cardLikeButtonClassName}`} type="button" onClick={handleLikeClick}></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
      <button className={`element__trash ${cardDeleteButtonClassName}`} type="button" onClick={handleDeleteClick}></button>
    </li>
  )
}

export default Card;