import React, { useEffect } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img alt="Аватар" className="profile__image" src={currentUser.avatar} />
          <a className="profile__overlay"></a>
        </div>
        <div className="profile__info">
          <div className="profile__about">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__button profile__button_type_edit opacity"
              aria-label="Редактировать" onClick={props.onEditProfile} />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button profile__button_type_add opacity" aria-label="Добавить" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
