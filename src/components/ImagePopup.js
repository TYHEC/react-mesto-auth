function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__zoom-container">
                <button
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть изображение"
                    onClick={props.onClose}
                />
                <img src={props.card.link} alt={props.card.name} className="popup__zoom-photo" />
                <h3 className="popup__zoom-name">{props.card.name}</h3>
            </div>
        </div>
    )
}
export default ImagePopup;