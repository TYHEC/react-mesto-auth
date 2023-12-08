export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
export const popupProfile = document.querySelector('#profile-popup');
export const editProfile = document.querySelector('.profile__edit');
export const addMestoIcon = document.querySelector('.profile__add-mesto');
export const cardsPopup = document.querySelector('#cards-popup');
export const formProfile = document.forms['information'];
export const formCards = document.forms['newplace'];
export const profileNameInput = popupProfile.querySelector('#name-input');
export const profileJobInput = popupProfile.querySelector('#job-input');
export const avatarPopup = document.querySelector('#avatar-popup');
export const formAvatar = document.forms['avatarform'];
export const editAvatarIcon = document.querySelector('.profile__avatar-change');

