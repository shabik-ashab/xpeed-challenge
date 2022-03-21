
import React, { useState } from "react";
import Repeater from "../Repeater/Repeater";

const Form = ({ formData }) => {
  const [inputField, setInputField] = useState([]);
  if (!formData?.data?.fields) {
    return <p>loading</p>;
  }
  const handleAddField = (e, arr) => {
    e.preventDefault();

    setInputField([...inputField, arr]);
  };

  const formField = formData?.data?.fields;
  //   console.log(formField);

  const tifOptions = Object.entries(formField[0]).map(
    (key) =>
      //   console.log(key[1])
      key[1]
  );
  return (
    <div className="container mt-5">
      <form>
        {Object.entries(formField[0]).map(
          (key, i) => {
            return (
              <div key={i}>
                {key[1].type.toString() !== "hidden" && (
                  <div className="input-group mb-3">
                    <span className="input-group-text">{key[1].title}</span>
                    {key[1].type === "text" && (
                      <input
                        type="text"
                        className={`form-control ${key[1].html_attr?.class}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                      />
                    )}
                    {key[1].type === "email" && (
                      <input
                        required
                        type="text"
                        className={`form-control ${key[1].html_attr?.class}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                      />
                    )}
                    {key[1].type === "textarea" && (
                      <input
                        type="text"
                        //   key[1].required?
                        className={`form-control ${key[1].html_attr?.class}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                      />
                    )}
                    {key[1].type === "select" && (
                      <select
                        className={`form-select form-select-lg mb-3 ${key[1].html_attr?.class}`}
                        aria-label=".form-select-lg example"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                      >
                        {key[1].options.map((o, i) => (
                          <option key={i} value={o.key}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {key[1].type === "radio" && (
                      <div className="ms-3">
                        {key[1].options.map((o, i) => (
                          <div key={i} className="form-check">
                            <input
                              value={o.key}
                              className={`form-check-input ${key[1].html_attr?.class}`}
                              type="radio"
                              name="flexRadioDefault"
                              //  checked={key[1].default === o.key}
                              id={`flexRadioDefault ${key[1].html_attr?.id}`}
                              required={key[1].required}
                            />

                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              {o.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {key[1].type === "repeater" && (
                      <div>
                        <Repeater
                          handleAddField={handleAddField}
                          tifOptions={tifOptions}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          }
          // console.log(key[0])
        )}
        <div>
          {inputField.map((field, i) => {
            return (
              <div style={{border:'1px solid black'}} className="mb-2" key={i}>
                {field.map((f, index) => (
                  <div  key={index} className="input-group p-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      {f.title}
                    </span>
                    <input
                      type={f.type}
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      required={f.required}
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
