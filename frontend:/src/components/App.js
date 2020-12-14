import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/api.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import resolveIcon from '../images/res.svg';
import rejectIcon from '../images/rej.svg';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState({
    icon: '',
    text: ''
  });
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        setMessage({ 
          icon: rejectIcon, 
          text: 'Что-то пошло не так! Попробуйте ещё раз.' 
        });
        setInfoTooltipOpen(true);
      });
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        if(data) {
          localStorage.setItem('jwt', data.jwt);
          setEmail(data.data.email);
        }
        history.push('/signin');
        setMessage({ 
          icon: resolveIcon, 
          text: 'Вы успешно зарегистрировались!' 
        });
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage({ 
          icon: rejectIcon, 
          text: 'Что-то пошло не так! Попробуйте ещё раз.' 
        });
        setInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleUpdateUser(info) {
    api.setUserInfo(info)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(link) {
    api.setUserAvatar(link)
        .then((link) => {
          setCurrentUser(link);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const newArrCards = cards.filter(element => element !== card);
        setCards(newArrCards);
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((card) => {
        setCards([...cards, card]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    Promise.all([ api.getUserInfo(), api.getInitialsCards() ])
      .then(([ info, data ]) => {
        setCurrentUser(info);
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((res) => {
          if (res){
            setEmail(res.data.email);
            }
            setLoggedIn(true);
            history.push('/');
        })
        .catch((err) => {
          console.error(err);
          setMessage({ 
            icon: rejectIcon, 
            text: 'Что-то пошло не так! Попробуйте ещё раз.' 
          });
          setInfoTooltipOpen(true);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header
            loggedIn={loggedIn}
            email={email}
            onLogout={handleLogout}
            />
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={loggedIn} handleLogout={handleLogout} component={Main}
                onEditAvatar={() => {
                  handleEditAvatarClick();
                }}
                onEditProfile={() => {
                  handleEditProfileClick();
                }}
                onAddPlace={() => {
                  handleAddPlaceClick();
                }}
                onCardClick={(card) => {
                  handleCardClick(card);
                }}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Route path='/signin'>
                <Login 
                  onLogin={handleLogin}
                />
              </Route>
              <Route path='/signup'>
                <Register 
                  onRegister={handleRegister}
                />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
              </Route>
            </Switch>
            <Footer />
          </div>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            message={message}
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser} 
          />
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups} 
            onAddPlace={handleAddPlaceSubmit} 
          />
          <PopupWithForm 
            name={'confirm'} 
            title={'Вы уверены?'} 
            text={'Да'}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar} 
          /> 
          <ImagePopup 
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
