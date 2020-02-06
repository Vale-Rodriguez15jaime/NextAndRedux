export const albumsActionTypes = {
  COMENZAR_DESCARGA_ALBUMS: "COMENZAR_DESCARGA_ALBUMMES",
  DESCARGA_ALBUMS_EXITO: "DESCARGA_ALBUMS_EXITO",
  DESCARGA_ALBUMS_ERROR: "DESCARGA_ALBUMS_ERROR",

  COMENZAR_DESCARGA_FOTOS: "COMENZAR_DESCARGA_FOTOS",
  DESCARGA_FOTOS_EXITO: "DESCARGA_FOTOS_EXITO",
  DESCARGA_FOTOS_ERROR: "DESCARGA_FOTOS_ERROR",

  COMENZAR_DESCARGA_USUARIO: "COMENZAR_DESCARGA_USUARIO",
  DESCARGA_USUARIO_EXITO: "DESCARGA_USUARIO_EXITO",
  DESCARGA_USUARIO_ERROR: "DESCARGA_USUARIO_ERROR",

  OBTENER_ALBUM_ELIMINAR: "OBTENER_ALBUM_ELIMINAR",
  ALBUM_ELIMINADO_EXITO: "ALBUM_ELIMINADO_EXITO",
  ALBUM_ELIMINADO_ERROR: "ALBUM_ELIMINADO_ERROR",

  AGREGAR_ALBUM: "AGREGAR_ALBUM",
  AGREGAR_ALBUM_EXITO: "AGREGAR_ALBUM_EXITO",
  AGREGAR_ALBUM_ERROR: "AGREGAR_ALBUM_ERROR",

  AGREGAR_FOTO: "AGREGAR_FOTO",
  AGREGAR_FOTO_EXITO: "AGREGAR_FOTO_EXITO",
  AGREGAR_FOTO_ERROR: "AGREGAR_FOTO_ERROR"
};
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

export function getAlbumAction() {
  return async dispatch => {
    dispatch(downloadAlbum());
    try {
      const response = await clienteAxios.get("/albums");
      dispatch(downloadAlbumSucces(response.data));
    } catch (error) {
      dispatch(downloadAlbumError());
    }
  };
}

const downloadAlbum = () => ({
  type: albumsActionTypes.COMENZAR_DESCARGA_ALBUMS,
  payload: true
});

const downloadAlbumSucces = albums => ({
  type: albumsActionTypes.DESCARGA_ALBUMS_EXITO,
  payload: albums
});

const downloadAlbumError = () => ({
  type: albumsActionTypes.DESCARGA_ALBUMS_ERROR,
  payload: true
});

// FOTOS RELACIONADAS

export function getPhotoAlbumAction(id, all = false) {
  return async dispatch => {
    dispatch(cargarFotosAlbum(id));
    try {
      const response = await clienteAxios.get(`/photos?albumId=${id}`);
      dispatch(
        cargarFotosAlbumSucces(
          all ? response.data : response.data.slice(0, 5),
          id
        )
      );
    } catch (error) {
      dispatch(cargarFotosAlbumError(error, id));
    }
  };
}

const cargarFotosAlbum = id => ({
  type: albumsActionTypes.COMENZAR_DESCARGA_FOTOS,
  payload: { load: true, id: id }
});

const cargarFotosAlbumSucces = (photos, id) => ({
  type: albumsActionTypes.DESCARGA_FOTOS_EXITO,
  payload: { photos: photos, id: id }
});

const cargarFotosAlbumError = (estado, id) => ({
  type: albumsActionTypes.DESCARGA_FOTOS_ERROR,
  payload: { estado, id }
});

// USUARIOS RELACIONADAS

export function setLoad(id, val) {
  return async dispatch => {
    dispatch(loadUser(id, val));
  };
}

export function getUserAlbumAction(id) {
  return async dispatch => {
    dispatch(loadUser(id));
    try {
      const responseu = await clienteAxios.get(`/users?id=${id}`);
      dispatch(loadUserSucces(responseu.data[0], id));
    } catch (error) {
      dispatch(loadUserError(error, id));
    }
  };
}

const loadUser = (id, val = true) => ({
  type: albumsActionTypes.COMENZAR_DESCARGA_USUARIO,
  payload: { load: val, id: id }
});

const loadUserSucces = (users, id) => ({
  type: albumsActionTypes.DESCARGA_USUARIO_EXITO,
  payload: { users: users, id: id }
});

const loadUserError = (estado, id) => ({
  type: albumsActionTypes.DESCARGA_USUARIO_ERROR,
  payload: { estado, id }
});

// eliminar

export function deleteAlbumAction(id) {
  return async dispatch => {
    dispatch(getAlbumDelete(id));

    try {
      await clienteAxios.delete(`/albums/${id}`);
      dispatch(deleteAlbumSucces());
      Swal.fire("Eliminado", "El album se elimino correctamente.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteAlbumError());
    }
  };
}

const getAlbumDelete = id => ({
  type: albumsActionTypes.OBTENER_ALBUM_ELIMINAR,
  payload: id
});

const deleteAlbumSucces = () => ({
  type: albumsActionTypes.ALBUM_ELIMINADO_EXITO
});

const deleteAlbumError = () => ({
  type: albumsActionTypes.ALBUM_ELIMINADO_ERROR,
  payload: true
});

//Agregar album
export function createNewAlbumAction(album) {
  return async dispatch => {
    dispatch(addAlbum());
    try {
      await clienteAxios.post("/albums", album);

      dispatch(addAlbumSucces(album));
      Swal.fire("Correcto", "El album se agrego", "succes");
    } catch (error) {
      dispatch(addAlbumError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addAlbum = () => ({
  type: albumsActionTypes.AGREGAR_ALBUM,
  payload: true
});

const addAlbumSucces = album => ({
  type: albumsActionTypes.AGREGAR_ALBUM_EXITO,
  payload: album
});

const addAlbumError = estado => ({
  type: albumsActionTypes.AGREGAR_ALBUM_ERROR,
  payload: estado
});

//Agregar Foto
export function createNewPhotoAction(photo) {
  return async dispatch => {
    dispatch(addPhoto());
    try {
      await clienteAxios.post("/photos", photo);

      dispatch(addPhotoSucces(photo));
      Swal.fire("Correcto", "la informacion de la FOTO se agrego", "succes");
    } catch (error) {
      dispatch(addPhotoError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addPhoto = () => ({
  type: albumsActionTypes.AGREGAR_FOTO,
  payload: true
});

const addPhotoSucces = photo => ({
  type: albumsActionTypes.AGREGAR_FOTO_EXITO,
  payload: photo
});

const addPhotoError = estado => ({
  type: albumsActionTypes.AGREGAR_FOTO_ERROR,
  payload: estado
});
