import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Album = ({ albums, openPhoto, confirmDelete }) => {
  const SIZE = "15";
  return (
    <div className='card post-item'>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-48x48'>
              {albums.photos === undefined && albums.loading === true
                ? "Cargando..."
                : null}
              {albums.photos !== undefined ? (
                albums.photos
                  .slice(0, 1)
                  .map((photo, index) => (
                    <img key={index} src={photo.thumbnailUrl} />
                  ))
              ) : (
                <img
                  src='https://bulma.io/images/placeholders/96x96.png'
                  alt='Placeholder image'
                />
              )}
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4'>
              {albums.users === undefined && albums.loading === true
                ? "Cargando..."
                : null}
              {albums.users !== undefined && albums.loading === false
                ? albums.users.name
                : null}
            </p>
            <p className='subtitle is-6'>
              @
              {albums.users !== undefined
                ? albums.users.username
                : "Cargando..."}
            </p>
          </div>
        </div>

        <div className='content'>
          <div>
            <b>{albums.title}</b>
          </div>
          {/*albums.users.address.city !== undefined
                ? albums.users.address.city
          : "Cargando.."*/}
          <br />
          <div>
            <b style={{ cursor: "pointer" }} onClick={openPhoto}>
              Fotos (
              {albums.photos !== undefined ? albums.photos.length : "..."})
            </b>
          </div>
          <time dateTime={new Date()}>11:09 PM - 22 Jan 2019</time>
        </div>
        <div>
          {" "}
          <button className='button is-link is-outlined mr5' type='button'>
            <FaEdit size={SIZE} />
          </button>{" "}
          <button
            className='button is-danger is-outlined mr5'
            onClick={() => confirmDelete(albums.id)}
            type='button'>
            <FaTrash size={SIZE} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Album;
