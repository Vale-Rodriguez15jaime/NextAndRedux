import React, { useState, Fragment } from "react";
import Formulario from "../../components/Formulario";
import Router from "next/router";
import { createNewAlbumAction } from "../../store/albumes/albumActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../styles/styles.sass";
const NewAlbum = props => {
  const [fields, setFields] = useState({
    userId: "",
    id: "",
    title: ""
  });
  const SIZE = 22;

  const add = album => props.createNewAlbumAction(album);

  const submitNew = e => {
    console.log(fields);

    if (Object.values(fields).includes("")) {
      Swal.fire({
        title: "Campos Incompletos",
        text: "Debe llenar todos los campos para guardar el registro",
        icon: "warning",
        timer: 3000
      });
      return;
    }

    add(fields);

    Router.push("/photos/new");
  };

  return (
    <Fragment>
      <div className='containerBtn' style={{ marginRight: "17rem" }}>
        <a className='button is-secondary mr15' href='/users/new'>
          <FaPlusCircle size={SIZE} /> Crear Usuario
        </a>
      </div>

      <Formulario
        fields={fields}
        setFields={setFields}
        onSubmitSave={submitNew}
      />
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createNewAlbumAction: bindActionCreators(createNewAlbumAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(NewAlbum);
