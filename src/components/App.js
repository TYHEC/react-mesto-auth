import Header from './Header';
import Footer from './Footer.js';
import Main from './Main.js';
import React, { useState } from 'react';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, useNavigate } from 'react-router-dom';
import authApi from '../utils/AuthApi.js';
import Da from '../images/Da.svg';
import Net from '../images/Net.svg';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const Navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [responseImage, setResponseImage] = useState('');
    const [responseTitle, setResponseTitle] = useState('');
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);
    React.useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserData(), api.getInitialCards()]).then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            }).catch((err) => {
                console.log(`Ошибка ${err}`)
            });
        }
    }, [isLoggedIn]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImageOpen(false);
        setIsInfoTooltip(false);
    }
    function handleCardClick(card) {
        setIsImageOpen(true);
        setSelectedCard(card);
    }
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (isLiked) {
            api.deleteCardLike(card._id).then((newCard) => {
                setCards((state) => state.map((cardElement) => (cardElement._id === card._id ? newCard : cardElement)));
            }).catch((err) => {
                console.log(`Ошибка ${err}`)
            });
        } else {
            api.placeCardLike(card._id).then((newCard) => {
                setCards((state) => state.map((cardElement) => (cardElement._id === card._id ? newCard : cardElement)));
            }).catch((err) => {
                console.log(`Ошибка ${err}`)
            });
        }
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cardsArr) => cardsArr.filter((cardElement) => cardElement._id !== card._id))
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            });
    }
    function handleUpdateUser(currentUser) {
        api.passeUserData(currentUser.name, currentUser.about).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            });
    }
    function handleUpdateAvatar(currentUser) {
        api.passAvatarData(currentUser.avatar).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            });
    }
    function handleAddPlaceSubmit(card) {
        api.postNewCard(card.name, card.link).then((newCard) => {
            setCards([newCard, ...cards]); closeAllPopups()
        })
            .catch((err) => {
                console.log(`Ошибка ${err}`)
            });

    }
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authApi.verificateUser(token).then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setEmail(res.data.email);
                }
            })
                .catch((err) => {
                    console.log(`Ошибка ${err}`)
                })
        }
    }, [])
    React.useEffect(() => {
        if (isLoggedIn === true) {
            Navigate('/')
        }
    }, [isLoggedIn, Navigate])


    function onLogin(email, password) {
        authApi.loginUser(email, password).then((res) => {
            localStorage.setItem('token', res.token);
            setIsLoggedIn(true);
            setEmail(email);
            Navigate('/');
        })
            .catch(() => {
                setResponseImage(Net);
                setResponseTitle('Что-то пошло не так! Попробуйте ещё раз.');
                handleInfoTooltip();
            });
    };

    function handleInfoTooltip() {
        setIsInfoTooltip(true);
    }
    function onRegister(email, password) {
        authApi.registerUser(email, password).then(() => {
            setResponseImage(Da);
            setResponseTitle('Вы успешн о зарегистрировались!')
            Navigate('/sign-in');
        }).catch(() => {
            setResponseImage(Net);
            setResponseTitle('Что-то пошло не так! Попробуйте ещё раз.')
        }).finally(handleInfoTooltip)
    }
    function onLogOut() {
        setIsLoggedIn(false)
        localStorage.removeItem('token')
        setEmail('');
        Navigate('/sign-in')
    }



    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path='/sign-in' element={
                        <>
                            <Header
                                title='Регистрация'
                                route='/sign-up' />
                            <Login
                                onLogin={onLogin}
                            />
                        </>
                    } />
                    <Route path="/sign-up" element={
                        <>
                            <Header
                                title="Войти"
                                route="/sign-in" />
                            <Register
                                onRegister={onRegister}
                            />
                        </>
                    } />
                    <Route exact path="/" element={
                        <>
                            <Header title='Выйти' onClick={onLogOut} route='' email={email} />
                            <ProtectedRoute
                                component={Main}
                                cards={cards}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                isLoggedIn={isLoggedIn}
                            />
                            <Footer />
                        </>
                    } />
                    <Route path='*' element={<Navigate to={isLoggedIn ? '/' : '/sign-in'} />} />
                </Routes>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImageOpen}
                />
                <InfoTooltip
                    message={responseTitle}
                    image={responseImage}
                    isOpen={isInfoTooltip}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider >
    )

}

export default App;
