export const articleActionTypes = {
    COMENZAR_DESCARGA_ARTICULOS: 'COMENZAR_DESCARGA_ARTICULOS',
    DESCARGA_ARTICULOS_EXITO: 'DESCARGA_ARTICULOS_EXITO',
    DESCARGA_ARTICULOS_ERROR: 'DESCARGA_ARTICULOS_ERROR',
    COMENZAR_DESCARGA_COMMENTS: 'COMENZAR_DESCARGA_COMMENTS',
    DESCARGA_COMMENTS_EXITO: 'DESCARGA_COMMENTS_EXITO',
    DESCARGA_COMMENTS_ERROR: 'DESCARGA_COMMENTS_ERROR',
    COMENZAR_DESCARGA_USUARIOS: 'COMENZAR_DESCARGA_USUARIOS',
    DESCARGA_USUARIOS_EXITO: 'DESCARGA_USUARIOS_EXITO',
    DESCARGA_USUARIOS_ERROR: 'DESCARGA_USUARIOS_ERROR',
    OBTENER_ARTICULO_ELIMINAR: 'OBTENER_ARTICULO_ELIMINAR',
    ARTICULO_ELIMINADO_EXITO: 'ARTICULO_ELIMINADO_EXITO',
    ARTICULO_ELIMINADO_ERROR: 'ARTICULO_ELIMINADO_ERROR',
    AGREGAR_ARTICULO: 'AGREGAR_ARTICULO',
    AGREGAR_ARTICULO_EXITO: 'AGREGAR_ARTICULO_EXITO',
    AGREGAR_ARTICULO_ERROR: 'AGREGAR_ARTICULO_ERROR',
    AGREGAR_COMENTARIO: 'AGREGAR_COMENTARIO',
    AGREGAR_COMENTARIO_EXITO: 'AGREGAR_COMENTARIO_EXITO',
    AGREGAR_COMENTARIO_ERROR: 'AGREGAR_COMENTARIO_ERROR',
    AGREGAR_USUARIO: 'AGREGAR_USUARIO',
    AGREGAR_USUARIO_EXITO: 'AGREGAR_USUARIO_EXITO',
    AGREGAR_USUARIO_ERROR: 'AGREGAR_USUARIO_ERROR'




    
  }
  import clienteAxios from '../../config/axios';
  import Swal from "sweetalert2";
  export function getArticleAction() {


    return async dispatch => {
        dispatch(downloadArticle());
    try {
      const responseArt = await clienteAxios.get("/posts");
      dispatch(downloadArticleSucces(responseArt.data));
    } catch (error) {
           dispatch(downloadArticleError(
          
      ));
    }
  };
}

const downloadArticle = () => ({
  type: articleActionTypes.COMENZAR_DESCARGA_ARTICULOS,
  payload: true
});

const downloadArticleSucces = articles => ({
  type: articleActionTypes.DESCARGA_ARTICULOS_EXITO,
  payload: articles
});

const downloadArticleError = () => ({
  type: articleActionTypes.DESCARGA_ARTICULOS_ERROR,
  payload: true,
  
});

// COMENTARIOS RELACIONADOS

export function getCommentsAction(id) {
  return async dispatch => {
    dispatch(downloadComments(id));
    try {
      const responseComm = await clienteAxios.get(`comments?postId=${id}`);
      dispatch(downloadCommentsSucces(responseComm.data, id));
    } catch (error) {
      dispatch(downloadCommentsError());
    }
  };
}
const downloadComments = id => ({
  type: articleActionTypes.COMENZAR_DESCARGA_COMMENTS,
  payload: { load: true, id: id }
});

const downloadCommentsSucces = (comments, id) => ({
  type: articleActionTypes.DESCARGA_COMMENTS_EXITO,
  payload: { comments: comments, id: id }
});

const downloadCommentsError = (estado, id) => ({
  type: articleActionTypes.DESCARGA_COMMENTS_ERROR,
  payload: (estado, id)
});

// descargar usuarios
export function getUsersAction(id) {
  return async dispatch => {
    dispatch(downloadUsers(id));
    try {
      const responseUser = await clienteAxios.get(`/users?id=${id}`);
    
      dispatch(downloadUsersSucces(responseUser.data[0], id));
      
    } catch (error) {
      dispatch(downloadUsersError());
    }
  };
}
const downloadUsers = id => ({
  type: articleActionTypes.COMENZAR_DESCARGA_USUARIOS,
  payload: { load: true, id: id }
});

const downloadUsersSucces = (users, id) => ({
  type: articleActionTypes.DESCARGA_USUARIOS_EXITO,
  payload: { users: users, id: id }
});

const downloadUsersError = (estado, id) => ({
  type: articleActionTypes.DESCARGA_USUARIOS_ERROR,
  payload: (estado, id)
});

// eliminar

export function deleteArticleAction(id) {
    return async dispatch => {
        dispatch(getArticleDelete(id));
        try {
            await clienteAxios.delete(`/posts/${id}`);
            dispatch(deleteArticleSucces());
            Swal.fire("Eliminado", "se elimino correctamente.", "success");
          } catch (error) {
            console.log(error);
            dispatch(deleteArticleError());
          }
        };
      }
      
      const getArticleDelete = id => ({
        type: articleActionTypes.OBTENER_ARTICULO_ELIMINAR,
        payload: id
      });
      
      const deleteArticleSucces = () => ({
        type: articleActionTypes.ARTICULO_ELIMINADO_EXITO
      });
      
      const deleteArticleError = () => ({
        type: articleActionTypes.ARTICULO_ELIMINADO_ERROR,
        payload: true
      });
          

//Agregar articulo
export function createNewArticleAction(article) {
    return async dispatch => {
      dispatch(addArticle());
      try {
        await clienteAxios.post("/posts", article);
  
        dispatch(addArticleSucces(article));
        Swal.fire("Correcto", "El articulo se agrego", "succes");
      } catch (error) {
        
        dispatch(addArticleError(true));
        Swal.fire({
          icon: "error",
          title: "hubo un error",
          text: "hubo un error, Intenta de Nuevo"
        });
      }
    };
  }
  
  
  const addArticle = () => ({
    type: articleActionTypes.AGREGAR_ARTICULO,
    payload: true
  });
  
  const addArticleSucces = article => ({
    type: articleActionTypes.AGREGAR_ARTICULO_EXITO,
    payload: article
  });
  
  const addArticleError = estado => ({
    type: articleActionTypes.AGREGAR_ARTICULO_ERROR,
    payload: estado
  });
  
  //Agregar comment
  export function createNewCommentAction(comment) {
    return async dispatch => {
      dispatch(addComment());
      try {
        await clienteAxios.post("/comments", comment);
  
        dispatch(addCommentSucces(comment));
        Swal.fire("Correcto", "El Comentario se agrego", "succes");
      } catch (error) {
        dispatch(addCommentError(true));
        Swal.fire({
          icon: "error",
          title: "hubo un error",
          text: "hubo un error, Intenta de Nuevo"
        });
      }
    };
  }
  
  const addComment = () => ({
    type: articleActionTypes.AGREGAR_COMENTARIO,
    payload: true
  });
  
  const addCommentSucces = comment => ({
    type: articleActionTypes.AGREGAR_COMENTARIO_EXITO,
    payload: comment
  });
  
  const addCommentError = estado => ({
    type: articleActionTypes.AGREGAR_COMENTARIO_ERROR,
    payload: estado
  });
  
//u
export function createNewUserAction(user) {
    return async dispatch => {

      console.log('ejecuta')
      console.log(user)
      dispatch(addUser());
      try {
        console.log(user)
        await clienteAxios.post("/users", user);
  
        dispatch(addUserSucces(user));
        Swal.fire("Correcto", "El usuario se agrego", "succes");
      } catch (error) {
        console.log(error)
        dispatch(addUserError(true));
        Swal.fire({
          icon: "error",
          title: "hubo un error",
          text: "hubo un error, Intenta de Nuevo"
        });
      }
    };
  }
  
  const addUser = () => ({
    type: articleActionTypes.AGREGAR_USUARIO,
    payload: true
  });
  
  const addUserSucces = user => ({
    type: articleActionTypes.AGREGAR_USUARIO_EXITO,
    payload: user
  });
  
  const addUserError = estado => ({
    type: articleActionTypes.AGREGAR_USUARIO_ERROR,
    payload: estado
  });