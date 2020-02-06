import { articleActionTypes } from "./articleActions";

const initialState = {
  articles: [],
  comments: [],
  users: [],
  error: null,
  loading: false,
  articleDelete: null,
  articleEdit: null,
  commentsEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case articleActionTypes.COMENZAR_DESCARGA_ARTICULOS:
    case articleActionTypes.AGREGAR_ARTICULO:
    case articleActionTypes.AGREGAR_COMENTARIO:
    case articleActionTypes.AGREGAR_USUARIO:
      return {
        ...state,
        loading: action.payload
      };

    case articleActionTypes.DESCARGA_ARTICULOS_ERROR:
    case articleActionTypes.DESCARGA_USUARIOS_ERROR:
    case articleActionTypes.DESCARGA_COMMENTS_ERROR:
    case articleActionTypes.ARTICULO_ELIMINADO_ERROR:
    case articleActionTypes.AGREGAR_ARTICULO_ERROR:
    case articleActionTypes.AGREGAR_COMENTARIO_ERROR:
    case articleActionTypes.AGREGAR_USUARIO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case articleActionTypes.DESCARGA_ARTICULOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        articles: action.payload
      };
    //comments

    case articleActionTypes.COMENZAR_DESCARGA_COMMENTS:
      let tabletemp = state.articles.map(article => {
        if (article.id === action.payload.id) {
          article.loading = action.payload.load;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: action.payload.load,
        article: [...state.articles, tabletemp]
      };

    case articleActionTypes.DESCARGA_COMMENTS_EXITO:
      let temp = state.articles.map(article => {
        if (article.id === action.payload.id) {
          article.comments = action.payload.comments;
          article.loading = false;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: false,
        articles: [...state.articles, temp]
      };

    case articleActionTypes.AGREGAR_COMENTARIO_EXITO:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload]
      };

    // usuarios

    case articleActionTypes.COMENZAR_DESCARGA_USUARIOS:
      let tabletem = state.articles.map(article => {
        if (article.userId === action.payload.id) {
          article.loading = action.payload.load;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: action.payload.load,
        article: [...state.articles, tabletem]
      };
    case articleActionTypes.DESCARGA_USUARIOS_EXITO:
      let temporal = state.articles.map(article => {
        if (article.userId === action.payload.users.id) {
          article.users = action.payload.users;
          article.loading = false;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: false,
        articles: [...state.articles, temporal]
      };

    // ELIMINAR

    case articleActionTypes.OBTENER_ARTICULO_ELIMINAR:
      return {
        ...state,
        articleDelete: action.payload
      };

    case articleActionTypes.ARTICULO_ELIMINADO_EXITO:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== state.articleDelete
        ),
        articleDelete: null
      };

    //agregar

    case articleActionTypes.AGREGAR_ARTICULO_EXITO:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, action.payload]
      };

    case articleActionTypes.AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload]
      };

    default:
      return state;
  }
}
