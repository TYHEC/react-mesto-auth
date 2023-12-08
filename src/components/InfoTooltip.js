function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ''}`}  >
            <div className="popup__container">
                <button className="popup__close" type="button" title="Закрыть форму" onClick={props.onClose} />
                <div className="popup__info">
                    <img className="popup__image" src={props.image} alt={props.message} />
                    <h3 className="popup__message">{props.message}</h3>
                </div>
            </div>
        </div>
    )
}
export default InfoTooltip;