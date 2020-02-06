import React from "react";
import Layout from "./Layout";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaPlusCircle
} from "react-icons/fa";
import ArticleContainer from "./Article";
import AlbumContainer from "./Albumes";
import "../styles/styles.sass";
const List = ({
  array,
  error,
  loading,
  w,
  page,
  byPage,
  setPage,
  filtered,
  setQuery,
  query,
  list,
  UrlNew
}) => {
  //console.log(array)

  const SIZE = 22;
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card' style={{ height: "110px" }}>
          <header className='card-header'>
            <p className='card-header-title'>Busqueda</p>
            <a href='#' className='card-header-icon' aria-label='more options'>
              <span className='icon'>
                <i className='fa fa-angle-down' aria-hidden='true'></i>
              </span>
            </a>
          </header>
          <div className='card-content' style={{ padding: "10px" }}>
            <div className='content'>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='text'
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                  }}
                />
                <span className='icon is-medium is-left'>
                  <i className='fa fa-search'></i>
                </span>
                <span className='icon is-medium is-right'>
                  <i className='fa fa-check'></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='containerBtn'>
          <a className='button is-secondary mr15' href={UrlNew}>
            <FaPlusCircle size={SIZE} />
          </a>
          <a className='button is-secondary mr15' href='/'>
            <FaArrowCircleLeft size={SIZE} />
          </a>
        </div>

        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Listado</p>
          </header>

          {error ? <p>Hubo un error</p> : null}

          <div className='card-content list-of-post'>
            {array.length === 0 ? <p>Esta Vacio</p> : null}

            {w
              ? list.map(array => {
                  return <ArticleContainer key={array.id} article={array} />;
                })
              : list.map((array, index) => {
                  return (
                    <AlbumContainer
                      key={array.id}
                      index={index}
                      albums={array}
                    />
                  );
                })}
          </div>

          <div className='center-page'>
            <FaArrowCircleLeft
              onClick={e => setPage(page === 1 ? 1 : page - 1)}
            />
            <span>Pagina {page}</span>
            <FaArrowCircleRight
              onClick={e =>
                setPage(filtered.length < page * byPage ? page : page + 1)
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default List;
