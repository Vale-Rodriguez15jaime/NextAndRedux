import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import Swals from "sweetalert2";
import Loader from "react-loader-spinner";
import Article from "./Artic";
import withReactContent from "sweetalert2-react-content";
import {
  getPhotoAlbumAction,
  getUserAlbumAction,
  deleteAlbumAction
} from "../store/albumes/albumActions";
import Album from "./Album";

const Swal = withReactContent(Swals);

const AlbumContainer = props => {
  const { albums } = props;
  const [loaded, setLoaded] = useState(false);
  const load = useSelector(state => state.albumes.loading);
  if (!loaded) {
    if (
      albums.photos === undefined &&
      (albums.loading === undefined || albums.loading === false) &&
      !load
    ) {
      if (albums.id !== undefined) {
        props.getPhotoAlbumAction(albums.id);
      }
    }

    if (
      albums.users === undefined &&
      (albums.loading === undefined || albums.loading === false) &&
      !load
    ) {
      props.getUserAlbumAction(albums.userId);
    }
    if (albums.photos !== undefined && albums.users !== undefined) {
      setLoaded(true);
    }
  }

  const openPhoto = () => {
    Swal.fire({
      title: "Fotos",
      html:
        albums.photos === undefined ? (
          <Loader
            type='RevolvingDot'
            color='#aaaaaa'
            height={100}
            width={100}
            timeout={10000}></Loader>
        ) : (
          <div>
            {albums.photos !== undefined
              ? albums.photos.slice(0, 4).map((photo, index) => (
                  <div
                    className='card'
                    key={index}
                    style={{ marginBottom: "10px" }}>
                    <div className='card-header'>
                      <div className='card-header-title'>{photo.title}</div>
                    </div>
                    <div className='card-content'>
                      <img src={photo.url} />
                    </div>
                  </div>
                ))
              : ""}
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
        props.deleteAlbumAction(id);
      }
    });
  };

  return (
    <Album
      openPhoto={openPhoto}
      key={albums.id}
      albums={albums}
      confirmDelete={confirmDelete}
    />
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getPhotoAlbumAction: bindActionCreators(getPhotoAlbumAction, dispatch),
    getUserAlbumAction: bindActionCreators(getUserAlbumAction, dispatch),
    deleteAlbumAction: bindActionCreators(deleteAlbumAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(AlbumContainer);
