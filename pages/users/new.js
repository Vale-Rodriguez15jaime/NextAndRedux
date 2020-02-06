import React, { useState, Fragment } from "react";
import Formulario from "../../components/Formulario";
import Router, { useRouter } from "next/router";
import { createNewUserAction } from "../../store/articles/articleActions";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import "../../styles/styles.sass";
const NewUser = props => {
  const [fields, setFields] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lon: ""
      }
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const addUser = user => props.createNewUserAction(user);

  const submitNewUser = e => {
    console.log("entre al boton");

    if (
      Object.values(fields).includes("") ||
      Object.values(fields)
        .filter(fiel => typeof fiel === "object")
        .map(fiel => Object.values(fiel))
        .reduce((all, cur) => all.concat(cur))
        .includes("") ||
      Object.values(fields)
        .filter(fiel => typeof fiel === "object")
        .map(fiel => Object.values(fiel))
        .reduce((all, cur) => all.concat(cur))
        .filter(fiel => typeof fiel === "object")
        .map(fiel => Object.values(fiel))
        .reduce((all, cur) => all.concat(cur))
        .includes("")
    ) {
      Swal.fire({
        title: "Campos Incompletos",
        text: "Debe llenar todos los campos para guardar el registro",
        icon: "warning",
        timer: 3000
      });
      return;
    }

    addUser(fields);

    Router.push("/articles");
  };

  return (
    <Fragment>
      <Formulario
        fields={fields}
        setFields={setFields}
        onSubmitSave={submitNewUser}>
        <h1 className='title'>Nuevo Usuario</h1>
      </Formulario>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createNewUserAction: bindActionCreators(createNewUserAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(NewUser);
