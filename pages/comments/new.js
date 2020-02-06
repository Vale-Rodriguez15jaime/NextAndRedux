import React, { useState, Fragment } from "react";
import Formulario from "../../components/Formulario";
import Router, { useRouter } from "next/router";
import { createNewCommentAction } from "../../store/articles/articleActions";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import "../../styles/styles.sass";
const NewComment = props => {
  const [fields, setFields] = useState({
    postId: "",
    id: "",
    name: "",
    email: "",
    body: ""
  });

  const add = comment => props.createNewCommentAction(comment);

  const submitNew = e => {
    console.log("entre al boton");

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

    Router.push("/articles");
  };

  return (
    <Fragment>
      <Formulario
        fields={fields}
        setFields={setFields}
        onSubmitSave={submitNew}>
        <h1 className='title'>Nuevo Comentario</h1>
      </Formulario>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createNewCommentAction: bindActionCreators(createNewCommentAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(NewComment);
