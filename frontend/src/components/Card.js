import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }
  return (
    <article className="elements__item">
      {isOwner && <button type="button" className="elements__button-delete opacity" onClick={handleCardDelete} />}
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="elements__footer">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button type="button" onClick={handleLikeClick} className={`elements__button-heart ${isLiked && 'elements__button-heart_active'}`} />
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
