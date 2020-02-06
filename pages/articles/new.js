import React, { useState, Fragment } from "react";
import Formulario from "../../components/Formulario";
import Router, { useRouter } from "next/router";
import { createNewArticleAction } from "../../store/articles/articleActions";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Swal from "sweetalert2";
import "../../styles/styles.sass"
const NewArticle = props => {
  const [fields, setFields] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });

  const add = article => props.createNewArticleAction(article);

  const submitNewArt = e => {
      console.log(fields)
    

    if (
      Object.values(fields).includes("")
    ) {
      Swal.fire({
        title: "Campos Incompletos",
        text: "Debe llenar todos los campos para guardar el registro",
        icon: "warning",
        timer: 3000
      });
      return;
    }

    add(fields);

    Router.push("/comments/new");
  };

  return (
    <Fragment>
      <Formulario
        fields={fields}
        setFields={setFields}
        onSubmitSave={submitNewArt}
        
      />
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createNewArticleAction: bindActionCreators(createNewArticleAction, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(NewArticle);
