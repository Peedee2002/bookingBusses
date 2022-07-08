import React from "react";
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as style from  './index.module.css';

export default function Request() {

  const [showResults, setShowResults] = useState(false)

  const formik = useFormik({
    initialValues:{
      fullName:'',
      email:'',
      dateStart:'',
      dateEnd:'',
      evDesc:''
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Please fill in your name"),
      email: Yup.string()
        .email("Please check that this is a correct email")
        .required("Please fill in your email"),
      
      dateStart: Yup.date().required("Please fill in the event's start date"),
      dateEnd: Yup.date().required("Please fill in the event's end date"),
      evDesc: Yup.string().required("Please describe your event")

    }),
    
    onSubmit: (values) =>{
      setShowResults(true)
      alert(JSON.stringify(values, null, 4))

    }
  })
  return (

    <div>
        <div className={style.winScreen} style={{display: showResults ? "block": "none"}}>
          <h1>Success!</h1>
          <h4>Thank you. We will get back to you soon via email.</h4>
        </div>

    <div>
    <h4 className={style.instruction}> Please fill in your details so we can help you</h4>
    
    
    <form onSubmit={formik.handleSubmit} style={{display: showResults ? "none": "block"}}>
    
      <div className={style.formInput}>
        <input id="fullName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.fullName} type="text" className={style.fullName} placeholder="Full Name"></input>
        {formik.touched.fullName && formik.errors.fullName ? <p>{formik.errors.fullName}</p> : null}
      </div>

      <div className={style.formInput}>
        <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className={style.email} placeholder="Email"></input>
        {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
      </div>

      <div className={style.formInput}>
        <div className={style.dateInput}>
          <div className={style.dates}>
            <label for="dateStart" >Event Starts:</label>
            <input id="dateStart" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateStart} type="date" className={style.dateStart} ></input> 
            {formik.touched.dateStart && formik.errors.dateStart ? <p>{formik.errors.dateStart}</p> : null}
          </div>
          
          <div className="dates">
            <label for="dateEnd">Event Ends:</label>
            <input id="dateEnd" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateEnd} type="date" className={style.dateEnd} ></input>
            {formik.touched.dateEnd && formik.errors.dateEnd ? <p>{formik.errors.dateEnd}</p> : null}
          </div>

        </div>

      </div>

      <div className={style.formInput}>
        <textarea id="evDesc" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.evDesc} className={style.evDesc} placeholder="Describe the event..."></textarea> 
        {formik.touched.evDesc && formik.errors.evDesc ? <p>{formik.errors.evDesc}</p> : null}
      </div>

      <input type="submit" className="sub-button"></input>
    </form>
    </div>
    </div>
  );
}
