import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import { auth } from '../utils/Auth';
import successIcon from '../images/popup/InfoTooltip/success.svg';
import deniedIcon from '../images/popup/InfoTooltip/denied.svg';

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, handleEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, handleAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarClick] = React.useState(false);

  const [isInfoPopupOpen, handleInfoPopupOpen] = React.useState(false);
  const [infoPopupIcon, setInfoPopupIcon] = React.useState('');
  const [infoPopupTitle, setInfoPopupTitle] = React.useState('');

  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    api.getUserInfo()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(console.error)
    api.getInitialCards()
      .then(cardsList => setCards(cardsList))
      .catch(console.error)
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.checkToken(jwt).then((res) => {
        if(res) {
          setLoggedIn(true)
          setEmail(res.data.email)
          navigate('/', {replace: true})
        }
      })
      .catch(console.error)
    }
  }, [])


  function closeAllPopups() {
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleInfoPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(console.error)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch(console.error)
  }
  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
  }

  function handleRegister({password, email}) {
    auth.register({password, email}).then((res) => {
      if(res) {
        setInfoPopupIcon(successIcon)
        setInfoPopupTitle('Вы успешно зарегистрировались!')
      }
    })
    .catch(() => {
      setInfoPopupIcon(deniedIcon)
      setInfoPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
    })
    .finally(() => {
      handleInfoPopupOpen(true)
    })
  }

  function handleLogin({password, email}) {
    auth.login({password, email}).then((res)=> {
      if(res) {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        setEmail(email)
        navigate('/', {replace: true})
      }
    })
    .catch(() => {
      setInfoPopupIcon(deniedIcon)
      setInfoPopupTitle('Что-то пошло не так! Попробуйте ещё раз.')
      handleInfoPopupOpen(true)
    })
  }

  function handleQuit () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} onQuit={handleQuit} email={email}/>
      <Routes>
        <Route path="/" element={<ProtectedRouteElement element={Main} loggedIn={loggedIn} cards={cards}
            setCards={setCards}
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />} />
        <Route path="/sign-up" element={<>
          <Register onSubmit={handleRegister}/>
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            infoPopupIcon={infoPopupIcon}
            infoPopupTitle={infoPopupTitle} />
          </>}/>
        <Route path="/sign-in" element={<>
          <Login onSubmit={handleLogin}/>
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            infoPopupIcon={infoPopupIcon}
            infoPopupTitle={infoPopupTitle} />
          </>}
          />
      </Routes>
      {loggedIn && <>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да"
        children='' />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
        </>
      }

    </CurrentUserContext.Provider>
  );
}

export default App;
