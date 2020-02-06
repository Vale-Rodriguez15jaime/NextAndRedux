import { albumsActionTypes } from "./albumActions";

const initialState = {
  albums: [],
  photos: [],
  error: null,
  loading: false,
  albumsDelete: null,
  albumsEdit: null,
  photosEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case albumsActionTypes.COMENZAR_DESCARGA_ALBUMS:
    case albumsActionTypes.AGREGAR_ALBUM:
    case albumsActionTypes.AGREGAR_FOTO:
      return {
        ...state,
        loading: action.payload
      };

    case albumsActionTypes.AGREGAR_ALBUM_ERROR:
    case albumsActionTypes.AGREGAR_FOTO_ERROR:
    case albumsActionTypes.ALBUM_ELIMINADO_ERROR:
    case albumsActionTypes.DESCARGA_ALBUMS_ERROR:
    case albumsActionTypes.DESCARGA_FOTOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case albumsActionTypes.DESCARGA_ALBUMS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        albums: action.payload
      };

    //photos

    case albumsActionTypes.COMENZAR_DESCARGA_FOTOS:
      let temp2 = state.albums.map(val => {
        if (val.id === action.payload.id) {
          val.loading = action.payload.load;
        } else {
          return val;
        }
      });
      return {
        ...state,
        loading: action.payload.load,
        albums: [...state.albums, temp2]
      };

    case albumsActionTypes.DESCARGA_FOTOS_EXITO:
      let temp = state.albums.map(val => {
        if (val.id === action.payload.id) {
          val.photos = action.payload.photos;
          val.loading = false;
        } else {
          return val;
        }
      });
      return {
        ...state,
        loading: false,
        albums: [...state.albums, temp]
      };
    // usuarios
    case albumsActionTypes.COMENZAR_DESCARGA_USUARIO:
      let temp3 = state.albums.map(val => {
        if (val.userId === action.payload.id) {
          val.loading = action.payload.load;
        } else {
          return val;
        }
      });
      return {
        ...state,
        loading: action.payload.load,
        albums: [...state.albums, temp3]
      };

    case albumsActionTypes.DESCARGA_USUARIO_EXITO:
      let tem = state.albums.map(val => {
        if (val.userId === action.payload.users.id) {
          val.users = action.payload.users;
          val.loading = false;
        } else {
          return val;
        }
      });
      return {
        ...state,
        loading: false,
        albums: [...state.albums, tem]
      };

    // ELIMINAR

    case albumsActionTypes.OBTENER_ALBUM_ELIMINAR:
      return {
        ...state,
        albumsDelete: action.payload
      };

    case albumsActionTypes.ALBUM_ELIMINADO_EXITO:
      return {
        ...state,
        albums: state.albums.filter(album => album.id !== state.albumsDelete),
        albumsDelete: null
      };

    //agregar

    case albumsActionTypes.AGREGAR_ALBUM_EXITO:
      return {
        ...state,
        loading: false,
        albums: [...state.albums, action.payload]
      };

    case albumsActionTypes.AGREGAR_FOTO_EXITO:
      return {
        ...state,
        loading: false,
        photos: [...state.photos, action.payload]
      };

    default:
      return state;
  }
}
