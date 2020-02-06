import React, { Fragment } from "react";
import Layout from "./Layout";
import InputRender from "./InputRender";

const Formulario = ({ fields, setFields, onSubmitSave, children }) => {
  return (
    <Layout>
      {children}
      <div className='columns is-multiline'>
        {Object.entries(fields)
          .map((intoIntoField, index) => {
            return (
              <Fragment>
                <InputRender
                  field={intoIntoField}
                  key={index}
                  setValue={e => {
                    setFields(prev => ({
                      ...prev,
                      [intoIntoField[0]]: e
                    }));
                  }}></InputRender>
              </Fragment>
            );
          })
          .reduce((acc, x) => (acc === null ? [x] : [acc, "", x]), null)}
      </div>
      <div className='center mr15'>
        <button className='button is-link ' onClick={onSubmitSave}>
          Guardar
        </button>
      </div>
    </Layout>
  );
};

export default Formulario;
