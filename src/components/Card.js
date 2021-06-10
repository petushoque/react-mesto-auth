import { React, useContext} from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card (props) {
  const user = useContext(CurrentUserContext)

  const isOwn = (props.owner === user._id);
  const cardDeleteButtonClassName = (`${isOwn ? 'card__delete' : 'card__delete_hidden'}`);

  const isLiked = props.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`; 

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props)
  }

  function handleDeleteClick() {
    props.onCardDelete(props)
  }

    return(
      
        <article className="card">
          <img className="card__picture" src={props.link} alt={props.name} onClick={() => handleClick()}/>
          <div className="card__info">
            <h2 className="card__signature">{props.name}</h2>
            <div className="card__like-section">
              <button className={cardLikeButtonClassName} type="button" onClick={() => handleLikeClick()}></button>
              <p className="card__like-counter">{props.likes.length}</p>
            </div>
          </div>
          <button className={cardDeleteButtonClassName} type="button" onClick={() => handleDeleteClick()}>
          </button>
        </article>
    )
}

export default Card;