import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import Swals from "sweetalert2";
import Loader from "react-loader-spinner";
import Article from "./Artic";
import withReactContent from "sweetalert2-react-content";
import {
  getCommentsAction,
  getUsersAction,
  deleteArticleAction
} from "../store/articles/articleActions";

const Swal = withReactContent(Swals);
const ArticleContainer = props => {
  const { article } = props;
  //console.log(article)
  const [loaded, setLoaded] = useState(false);
  const load = useSelector(state => state.articles.loading);
  /*
  useEffect(() => {
    
    const loadP = props => {
      if (
        article.users === undefined &&
        (article.loading === undefined || article.loading === false) &&
        !load
      ) {
        if (article.userId != undefined) {
          props.getUsersAction(article.userId);
        }
      }}

     
        
      
    const loadU = props => { 
      if (
        article.comments === undefined &&
        (article.loading === undefined || article.loading === false) &&
        !load
      ) {
        props.getCommentsAction(article.id);
      }
      
    } 
    
    const call = (props) => {
      loadU(props)
      loadP(props);
    }
    
    call(props)
    
    return () => {
      call
    };
  }, [])*/
  if (!loaded) {
    if (
      article.users === undefined &&
      (article.loading === undefined || article.loading === false) &&
      !load
    ) {
      if (article.userId != undefined) {
        props.getUsersAction(article.userId);
      }
    }

    if (
      article.comments === undefined &&
      (article.loading === undefined || article.loading === false) &&
      !load
    ) {
      props.getCommentsAction(article.id);
    }
    if (article.comments != undefined && article.users != undefined) {
      setLoaded(true);
    }
  }
  const openComment = () => {
    Swal.fire({
      title: "Comentarios",
      html:
        article.comments === undefined ? (
          <Loader
            type='RevolvingDot'
            color='#aaaaaa'
            height={100}
            width={100}
            timeout={10000}></Loader>
        ) : (
          <div>
            {article.comments.map(comment => (
              <div className='card' style={{ marginBottom: "10px" }}>
                <div className='card-header'>
                  <div className='card-header-title'>{comment.name}</div>
                </div>
                <div className='card-content'>{comment.body}</div>
                <div className='card-footer'>
                  <div className='card-footer-item'>{comment.email}</div>
                </div>
              </div>
            ))}
          </div>
        )
    });
  };

  const confirmDelete = id => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una vez que se eliminar no se puede eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        props.deleteArticleAction(id);
      }
    });
  };

  return (
    <Article
      openComment={openComment}
      key={article.id}
      article={article}
      confirmDelete={confirmDelete}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getCommentsAction: bindActionCreators(getCommentsAction, dispatch),
    getUsersAction: bindActionCreators(getUsersAction, dispatch),
    deleteArticleAction: bindActionCreators(deleteArticleAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ArticleContainer);
