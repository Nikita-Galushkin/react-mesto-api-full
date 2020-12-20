import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile section content__section">
        <div className="profile__info">
          <button className="profile__image-button" type="button" onClick={onEditAvatar}>
            <div className="profile__icon"></div>
            <img src={currentUser.avatar} alt="фото" className="profile__image" />
          </button>
          <div className="profile__edit">
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements section content__section">
        <ul className="elements__list">
          {cards && cards.map((card) =>
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;