import React, { useState, Fragment } from "react";
import Formulario from "../../components/Formulario";
import Router from "next/router";
import { createNewPhotoAction } from "../../store/albumes/albumActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaPlusCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import "../../styles/styles.sass";
const NewPhoto = props => {
  const [fields, setFields] = useState({
    albumId: "",
    id: "",
    title: "",
    url: "",
    thumbnailUrl: ""
  });
  const SIZE = 22;

  const add = photo => props.createNewPhotoAction(photo);

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

    Router.push("/albums");
  };

  return (
    <Fragment>
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
    createNewPhotoAction: bindActionCreators(createNewPhotoAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(NewPhoto);
