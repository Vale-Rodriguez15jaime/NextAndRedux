import React from "react";

const trans = {
  es: {
    id: "Identificación",
    name: "Nombre",
    username: "Nombre de Usuario",
    email: "Email",
    address: "Dirección",
    street: "Calle",
    city: "Ciudad",
    zipcode: "Codigo Postal",
    geo: "Geografia",
    lat: "Latitud",
    lon: "Longitud",
    company: "Compañia",
    catchPhrase: "Frase",
    userId: "Id del Usuario",
    title: "Titulo",
    body: "Contenido",
    postId: "Id del Articulo",
    albumId: "Id del Album previamente creado o existente",
    url: "Url de la Foto",
    thumbnailUrl: "Url de la Foto Miniatura"
  },
  en: {
    id: "Identification"
  }
};
class Translator {
  static availableLang = ["es", "en"];
  constructor() {}
  static trans = (val, lang = "es") => {
    if (trans.hasOwnProperty(lang)) {
      if (trans[lang].hasOwnProperty(val)) {
        return trans[lang][val];
      }
    }
    return val;
  };
}

export default Translator;
