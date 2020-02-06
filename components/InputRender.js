import React from "react";
import Translator from "./Translator";
const InputRender = props => {
  let field = props.field;
  if (typeof field[1] === "object") {
    return (
      <>
        <div className='column is-full'>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "10px 0px"
            }}>
            {Translator.trans(field[0])}
          </h3>
        </div>
        {Object.entries(field[1])
          .map((intoIntoField, index) => {
            return (
              <InputRender
                field={intoIntoField}
                key={index}
                setValue={e => {
                  let tempState = field[1];
                  tempState[intoIntoField[0]] = e;
                  props.setValue(tempState);
                }}></InputRender>
            );
          })
          .reduce((acc, x) => (acc === null ? [x] : [acc, "", x]), null)}
      </>
    );
  }

  return (
    <div className='column is-half-desktop'>
      <div className='field'>
        <label className='label'>{Translator.trans(field[0])}</label>
        <input
          className='input'
          type='text'
          placeholder={field[0]}
          name={field[0]}
          value={field[1]}
          onChange={ez => {
            ez.persist();
            props.setValue(ez.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default InputRender;
