import PopupWithForm from "./PopupWithForm";
import React, { useState } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);
    

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
        });
    }
    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={'Редактировать профиль'}
            form={'information'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}>
            <label htmlFor="name-input" className="popup__field">
                <input
                    type="text"
                    className="popup__input"
                    name="name"
                    placeholder="Ваше имя"
                    required=""
                    minLength={2}
                    maxLength={40}
                    id="name-input"
                    onChange={handleNameChange}
                    value={name || ''}
                />
                <span className="name-input-error popup__error" />
            </label>
            <label htmlFor="job-input" className="popup__field">
                <input
                    type="text"
                    className="popup__input"
                    name="job"
                    placeholder="Род деятельности"
                    required=""
                    minLength={2}
                    maxLength={200}
                    id="job-input"
                    onChange={handleDescriptionChange}
                    value={description || ''}
                />
                <span className="job-input-error popup__error" />
            </label>
        </PopupWithForm>
    )
}
export default EditProfilePopup;