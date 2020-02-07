import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { getAlbumAction } from "../store/albumes/albumActions";
import { connect, useSelector } from "react-redux";
import List from "../components/List";

function useSearch(albums) {
  const [query, setQuery] = React.useState("");
  const [filteredAlbums, setFilteredAlbums] = React.useState(albums);

  React.useMemo(() => {
    const result = albums.filter(albums => {
      let us =
        albums.users !== undefined
          ? `${albums.users.name}`
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            `${albums.users.username}`
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            `${albums.users.address.city}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : false;
      return (
        `${albums.title}`.toLowerCase().includes(query.toLowerCase()) ||
        `${albums.id}`.includes(query) ||
        us
      );
    });
    setFilteredAlbums(result);
  }, [albums, query]);
  return { query, setQuery, filteredAlbums };
}

const albums = props => {
  useEffect(() => {
    const loadA = props.getAlbumAction();
    //loadA() REACT SOLO
    return () => {
      clearInterval(loadA());
    };
    // eslint-disable-next-line
  }, []);

  const albums = useSelector(state => state.albumes.albums);
  const error = useSelector(state => state.albumes.error);
  const loading = useSelector(state => state.albumes.loading);
  const { query, setQuery, filteredAlbums } = useSearch(albums);

  const [byPage, setByPage] = useState(20);

  const [page, setPage] = useState(1);

  const albumsList = filteredAlbums.filter(
    val => val.id < byPage * page && val.id >= byPage * page - byPage
  );
  // console.log(articles)

  if (albumsList.length === 0) {
    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>Busqueda</p>
          <a href='#' className='card-header-icon' aria-label='more options'>
            <span className='icon'>
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </span>
          </a>
        </header>
        <div className='card-content'>
          <div className='content'>
            <div className='control has-icons-left has-icons-right'>
              <input
                className='input is-large'
                type='text'
                placeholder='Escriba aqui...'
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
    );
  }

  return (
    <List
      key={albums.id}
      array={albums}
      error={error}
      loading={loading}
      w={false}
      query={query}
      setByPage={setByPage}
      setPage={setPage}
      page={page}
      byPage={byPage}
      filtered={filteredAlbums}
      setQuery={setQuery}
      list={albumsList}
      UrlNew={"/albums/new"}
    />
  );
};
/*
articles.getInitialProps = async ({ store }) => {
    const loadA = store.dispatch(getArticleAction())
    return{loadA}
}*/
const mapDispatchToProps = dispatch => {
  return {
    getAlbumAction: bindActionCreators(getAlbumAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(albums);
