import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);


    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    };
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    };

    return (
        <div className="element">
            {isOwn && <button
                className="element__trash"
                type="button"
                aria-label="Удалить изображение"
                onClick={handleDeleteClick}
            />}
            <img src={props.card.link} alt={props.card.name} className="element__photo" onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-zone">
                    <button type="button" className={`element__like ${isLiked ? 'element__like_active' : ''}`} aria-label="Нравится" onClick={handleLikeClick} />
                    <p className="element__like-counter">{props.card.likes.length > 0 ? props.card.likes.length : ''}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;