import Header from './Header';
import Footer from './Footer.js';
import Main from './Main.js';
import React from 'react';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({})
    const [isImageOpen, setIsImageOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()]).then(([userData, cards]) => {
            setCurrentUser(userData);
            setCards(cards);
        }).catch((err) => {
            console.log(`Ошибка ${err}`)
        });
    }, []);

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
        setIsImageOpen(false)
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



    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}

                />
                <Footer />
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
            </div>
        </CurrentUserContext.Provider>
    )

}

export default App;
