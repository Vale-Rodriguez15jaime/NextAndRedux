import Router, { useRouter } from "next/router";

export const submitNew = ({fields, add}) => {
  e.preventDefault();
  if (
    Object.values(fields).includes("") ||
    Object.values(fields)
      .filter(fiel => typeof fiel == "object")
      .map(fiel => Object.values(fiel))
      .reduce((all, cur) => all.concat(cur))
      .includes("") ||
    Object.values(fields)
      .filter(fiel => typeof fiel == "object")
      .map(fiel => Object.values(fiel))
      .reduce((all, cur) => all.concat(cur))
      .filter(fiel => typeof fiel == "object")
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

  add(fields);

  Router.push("/articles")
};