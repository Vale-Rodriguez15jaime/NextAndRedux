import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Article = ({ article, openComment, confirmDelete }) => {
    console.log(article)
   const SIZE = "15";
  return (
    <div className='card post-item'>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-48x48'>
              <img
                src='https://bulma.io/images/placeholders/96x96.png'
                alt='Placeholder image'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4'>
              {article.users !== undefined ? article.users.name : "Cargando.."}
            </p>
            <p className='subtitle is-6'>
              @
              {article.users !== undefined
                ? article.users.username
                : "Cargando.."}
            </p>
          </div>
        </div>

        <div className='content'>
          <div>
            <b>{article.title}</b>
          </div>
          {article.body}
          <br />
          <div>
            <b style={{ cursor: "pointer" }} onClick={openComment}>
              Comentarios (
              {article.comments !== undefined ? article.comments.length : "..."}
              )
            </b>
          </div>
          <time dateTime={new Date()}>11:09 PM - 22 Jan 2019</time>
        </div>
        <div>      <button
          className='button is-link is-outlined mr5'
          type='button'
          >
          <FaEdit size={SIZE} />
        </button>       <button
          className='button is-danger is-outlined mr5'
          onClick={() => confirmDelete(article.id)}
          type='button'>
          <FaTrash size={SIZE} />
        </button></div>
   
      </div>
    </div>
  );
};

export default Article;
