import React from "react";
function PopupWithForm(popupType) {
    return (
        <div className={`popup popup_type_${popupType.name} ${popupType.isOpen ? `popup_opened` : ''}`}  >
            <div className="popup__container">
                <button className="popup__close" type="button" title="Закрыть форму" onClick={popupType.onClose} />
                <h3 className="popup__title">{popupType.title}</h3>
                {popupType.children}
                <form name={popupType.form} className="popup__form" onSubmit={popupType.onSubmit}>
                    <button
                        type="submit"
                        className="popup__submit"
                        title="Сохранить"
                    >
                        {popupType.buttonText || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm;