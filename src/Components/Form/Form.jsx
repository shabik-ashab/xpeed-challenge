
import React, { useState } from "react";
import Repeater from "../Repeater/Repeater";
import { useLocation } from 'react-router-dom';

const Form = ({ formData }) => {
  const [inputField, setInputField] = useState([]);
  const [value,setValue] = useState([]);

  const [formValues,setFormValues] = useState({});
  const [formErrors,setFormErrors] = useState({});
  const[error,setError] = useState(true);
  const[name,setName] = useState('')

  const location = useLocation();

  const path = location.pathname;

  if (!formData?.data?.fields) {
    return <p>loading</p>;
  }
  const handleAddField = (e, arr,val) => {
    e.preventDefault();

    setInputField([...inputField, arr]);
    setValue(val)
  };
  // console.log(inputField);

  const formField = formData?.data?.fields;
  //   console.log(formField);

  const tifOptions = Object.entries(formField[0]).map(
    (key) =>
      //   console.log(key[1])
      key[1]
  );
//  console.log(formField);
 
 const handleChange = e => {
  //  console.log(e.target);
   const {name,value} = e.target;
   setFormValues({...formValues, [name]: value})
  //  console.log(formValues);
   const newVal = value.replace(value.replace(/[^a-zA-Z\d]/ig, ""))
  //  setName(value.replace(/\p{L}+/u, ""))
 }
 const handleSubmit = e => {
   e.preventDefault();
  //  setFormErrors(validate(formValues) )
  fetch("http://localhost/api/reorder.php ", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
          if (data.status === 'success') {
            alert('ok')
          }
        });
  

 }
//  const validate = (e,val) => {
//   const errors = {};
//   const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//   const nameReg = /[A-Za-z]/i;
//   if(!nameReg.test(e.target.value) || e.target.name === 'full name'){
//     console.log(e.target.value);
//     errors.name = 'only letter is valid'
//     setError(true)
//   }else if(nameReg.test(e.target.value) || e.target.name === 'full name'){
//     console.log(e.target.value);
//     errors.name = '';
//     setError(false)
//   }
//   return errors;
//  }
// const handleBlur = (e,val) => {
//   const errors = {};
//   // console.log(val);
//   const fieldName = e.target.name;
//   setFormErrors(validate(e,val) )
//   // if(formErrors.name === ''){
//   //   setError(false)
//   // }

// }
console.log(error);
  return (
    <div className="container mt-5">
       {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        {Object.entries(formField[0]).map(
          (key, i) => {
            return (
              <div key={i}>
                {key[1].type.toString() !== "hidden" && (
                  <div className="input-group mb-3">
                    <span className="input-group-text">{key[1].title}</span>
                    {key[1].type === "text" && (
                      <>
                      <input
                      name={key[1].title.toLowerCase()}
                        type="text"
                        className={`form-control ${key[1].html_attr?.class}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                        placeholder={key[1].value}
                        defaultValue={key[1].value}
                        onChange={handleChange}
                        // pattern='[A-Za-z]'
                        // value={name}
                        // onBlur={(e) => handleBlur(e,key[1].validate)}
                      />
                      <br />
                      <p>{formErrors.name}</p>
                      </>
                    )}
                    
                    {key[1].type === "email" && (
                      <input
                        required
                        name={key[1].title.toLowerCase()}
                        type="email"
                        className={`form-control ${key[1].html_attr?.class}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                        placeholder={key[1].value}
                        defaultValue={key[1].value}
                        onChange={handleChange}
                      />
                    )}
                    {key[1].type === "textarea" && (
                      <input
                        type="text"
                        name={key[1].title.toLowerCase()}
                        //   key[1].required?
                        className={`form-control ${key[1].html_attr?.class}`}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                        placeholder={key[1].value}
                        defaultValue={key[1].value}
                        onChange={handleChange}
                      />
                    )}
                    {key[1].type === "select" && (
                      <select
                      name={key[1].title.toLowerCase()}
                        className={`form-select form-select-lg mb-3 ${key[1].html_attr?.class}`}
                        aria-label=".form-select-lg example"
                        id={key[1].html_attr?.id}
                        required={key[1].required}
                        onChange={handleChange}
                      >
                        {/* {
                        key[1].value && 
                        <option value={key[1].value} selected></option>  
                         } */}
                        {key[1].options.map((o, i) => (
                          <option defaultValue={key[1].value} key={i} value={o.key}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {key[1].type === "radio" && (
                      < >
                        {key[1].options.map((o, i) => (
                          <div key={i} className="form-check mt-1">
                            <input
                            name={key[1].title.toLowerCase()}
                              value={o.key}
                              className={`form-check-input ms-2  ${key[1].html_attr?.class}`}
                              type="radio"
                              name="flexRadioDefault"
                              //  checked={key[1].default === o.key}
                              id={`flexRadioDefault ${key[1].html_attr?.id}`}
                              required={key[1].required}
                              // placeholder={key[1].value}
                              // defaultValue={key[1].value}
                              defaultChecked={key[1].default === o.key}
                              // onChange={}
                              onChange={handleChange}
                            />

                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                              
                            >
                              {o.label}
                            </label>
                          </div>
                        ))}
                      </>
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
                  <div key={index}>
                    {
                      path.startsWith('/form/') ?
                     <div>
                        {
                          value.map((v,ind) => (
                            <div key={ind}  className="input-group p-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      {f.title}
                    </span>
                    <input
                      name={f.title.toLowerCase()}
                      type={f.type}
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      required={f.required}
                      // placeholder={}
                      onChange={handleChange}
                      defaultValue={f.title === 'Work place' ? v.work_place : v.designation}
                    />
                  </div >
                          ))
                        }
                      </div> 
                      :
                      <div   className="input-group p-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-default"
                    >
                      {f.title}
                    </span>
                    <input
                    name={f.title.toLowerCase()}
                      type={f.type}
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      required={f.required}
                      onChange={handleChange}
                      // placeholder={}
                      // defaultValue={key[1].value}
                    />
                  </div>                 
                      }
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <div className="col-12">
          <button  className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
