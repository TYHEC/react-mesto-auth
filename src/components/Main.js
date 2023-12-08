import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-zone">
                    <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
                    <button
                        type="button"
                        aria-label="Сменить изображение профиля"
                        className="profile__avatar-change"
                        onClick={props.onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit"
                        aria-label="Редактировать профиль"
                        onClick={props.onEditProfile}
                    />
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-mesto"
                    aria-label="Добавить Место"
                    onClick={props.onAddPlace}
                />
            </section>
            <section className="elements">
                {props.cards.map((cardElement) => (
                    < Card
                        key={cardElement._id}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        card={cardElement} />
                ))}
            </section>
        </main>
    )
}
export default Main;