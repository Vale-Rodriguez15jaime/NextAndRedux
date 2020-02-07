import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { getArticleAction } from "../store/articles/articleActions";
import { connect, useSelector } from "react-redux";
import List from "../components/List";

function useSearch(articles) {
  const [query, setQuery] = React.useState("");
  const [filteredArticle, setFilteredArticle] = React.useState(articles);

  React.useMemo(() => {
    const result = articles.filter(article => {
      let us =
        article.users !== undefined
          ? `${article.users.name}`
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            `${article.users.username}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : false;
      return (
        `${article.title}`.toLowerCase().includes(query.toLowerCase()) ||
        `${article.id}`.includes(query) ||
        us
      );
    });
    setFilteredArticle(result);
  }, [articles, query]);
  return { query, setQuery, filteredArticle };
}

const articles = props => {
  useEffect(() => {
    const loadA = props.getArticleAction();

    return () => {
      clearInterval(loadA());
    };
    // eslint-disable-next-line
  }, []);

  const articles = useSelector(state => state.articles.articles);
  const error = useSelector(state => state.articles.error);
  const loading = useSelector(state => state.articles.loading);
  const { query, setQuery, filteredArticle } = useSearch(articles);

  const [byPage, setByPage] = useState(20);

  const [page, setPage] = useState(1);

  const articleList = filteredArticle.filter(
    val => val.id < byPage * page && val.id >= byPage * page - byPage
  );
  // console.log(articles)

  if (articleList.length === 0) {
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
      key={articles.id}
      array={articles}
      error={error}
      loading={loading}
      w={true}
      query={query}
      setByPage={setByPage}
      setPage={setPage}
      page={page}
      byPage={byPage}
      filtered={filteredArticle}
      setQuery={setQuery}
      list={articleList}
      UrlNew={"/articles/new"}
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
    getArticleAction: bindActionCreators(getArticleAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(articles);
