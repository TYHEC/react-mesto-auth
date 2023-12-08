import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current.value = '';
    }, [props.isOpen]);
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: ref.current.value
        });
    }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={'Обновить аватар'}
            form={'avatarform'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <label htmlFor="avatar-input" className="popup__field">
                <input
                    type="url"
                    className="popup__input"
                    placeholder="Ссылка на аватар"
                    required
                    id="avatar-input"
                    ref={ref}
                />
                <span className="popup__error avatar-input-error" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;