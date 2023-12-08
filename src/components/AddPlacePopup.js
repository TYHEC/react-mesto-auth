import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const cardLink = useRef();
    const cardName = useRef();
    React.useEffect(() => {
        cardName.current.value = '';
        cardLink.current.value = '';
    }, [props.isOpen])
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: cardName.current.value,
            link: cardLink.current.value
        })
    }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name={'cards'}
            title={'Новое место'}
            form={'newplace'}
            buttonText={'Создать'}
            onSubmit={handleSubmit}>
                    <label htmlFor="card-name-input" className="popup__field">
                        <input
                            type="text"
                            className="popup__input"
                            name="cardname"
                            placeholder="Название"
                            required=""
                            minLength={2}
                            maxLength={30}
                            id="card-name-input"
                            ref={cardName}
                        />
                        <span className="popup__error card-name-input-error" />
                    </label>
                    <label htmlFor="card-link-input" className="popup__field">
                        <input
                            type="url"
                            className="popup__input"
                            name="cardlink"
                            placeholder="Сслыка на картинку"
                            required=""
                            id="card-link-input"
                            ref={cardLink}
                        />
                        <span className="popup__error card-link-input-error" />
                    </label>
                </PopupWithForm>

            )} 
 
export default AddPlacePopup;