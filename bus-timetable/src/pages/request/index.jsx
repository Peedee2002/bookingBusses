import React from "react";
import { useState } from 'react';
import { Field, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { RadioButton } from "../../components/RadioButton";
import dayjs from 'dayjs';

const BACKEND_API = process.env.NODE_ENV === 'production' ? "" : "http://localhost:3000"

function App() {
  const today = new Date();

  const [showResults, setShowResults] = useState(false)

  const formik = useFormik({
    initialValues:{
      fullName:'',
      email:'',
      dateStart:'',
      timeStart:'',
      dateEnd:'',
      timeEnd:'',
      evDesc:'',
      bus:''
    },

    validationSchema: Yup.object({
      fullName: Yup.string().required("Please fill in your name"),
      email: Yup.string()
        .email("Please check that this is a correct email")
        .required("Please fill in your email"),


      dateStart: Yup.date().min(today, "Please check this start date").required("Please fill in the event's start date"),
      dateEnd: Yup.date().min(Yup.ref('dateStart'), "Please check this end date").required("Please fill in the event's end date"),

      timeStart: Yup.string().required("Please fill in the time that this event starts at"),
      timeEnd: Yup.string().required("Please fill in the time that this event ends at"),
      bus: Yup.string().required("Please select a bus"),

      evDesc: Yup.string().required("Please describe your event"),
    }),

    onSubmit: (values) =>{
      setShowResults(true)
      const given = {...values}
      given.start = dayjs(values.dateStart + values.timeStart).toDate()
      console.log(given.start)
      given.end = dayjs(values.dateEnd + values.timeEnd).toDate()
      delete given.dateEnd
      delete given.dateStart
      delete given.timeStart
      delete given.timeEnd
      fetch(BACKEND_API + `/api/${values.bus}/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(given)
      })
    }
  })
  return (
    <div>
      <div className="winScreen" style={{display: showResults ? "block": "none"}}>
        <h1>Success!</h1>
        <h4>Thank you. We will get back to you soon via email.</h4>
      </div>

      <form onSubmit={formik.handleSubmit} style={{display: showResults ? "none": "block"}}>
        <h4 className="instruction">Bus Sign-up Form</h4>
        <div className="formInput">
          <input id="fullName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.fullName} type="text" className="fullName" placeholder="Full Name"></input>
          {formik.touched.fullName && formik.errors.fullName ? <p>{formik.errors.fullName}</p> : null}
        </div>

        <div className="formInput">
          <input id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className="email" placeholder="Email"></input>
          {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
        </div>

        <div className="formInput">
          <div className="dateInput">
            <div className="dates">
              <label htmlFor="dateStart" >Event Starts</label>
              <input id="dateStart" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateStart} type="date" className="dateStart" ></input> 
              {formik.touched.dateStart && formik.errors.dateStart ? <p>{formik.errors.dateStart}</p> : null}
            </div>

            <div className="dates">
              <label htmlFor="dateEnd">And the Event Ends</label>
              <input id="dateEnd" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateEnd} type="date" className="dateEnd" ></input>
              {formik.touched.dateEnd && formik.errors.dateEnd ? <p>{formik.errors.dateEnd}</p> : null}
            </div>
          </div>

          <div className="dateInput">          
            <div className="dates">
              <label htmlFor="timeStart" >At:</label>
              <input id="timeStart" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.timeStart} type="time" className="timeStart" ></input> 
              {formik.touched.timeStart && formik.errors.timeStart ? <p>{formik.errors.timeStart}</p> : null}
            </div>

            <div className="dates">
              <label htmlFor="timeEnd">At:</label>
              <input id="timeEnd" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.timeEnd} type="time" className="timeEnd" ></input>
              {formik.touched.timeEnd && formik.errors.timeEnd ? <p>{formik.errors.timeEnd}</p> : null}
            </div>
          </div>
        </div>

        <legend className="labelBus">Please select which bus/buses you would like to book:</legend>
        <div className="checkBoxes">
          <FormikProvider value={formik}>
            <Field
              component={RadioButton}
              name="bus"
              id="smallBus"
              label="Smaller Bus (Capacity of 14)"
            />
            <Field
              component={RadioButton}
              name="bus"
              id="bigBus"
              label="Big Bus (Capacity of 21)"
            />
          </FormikProvider>
          {formik.touched.bus && formik.errors.bus ? <p>{formik.errors.bus}</p> : null}
        </div>

        <div className="formInput">
          <textarea id="evDesc" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.evDesc} className="evDesc" placeholder="Describe the event..."></textarea> 
          {formik.touched.evDesc && formik.errors.evDesc ? <p>{formik.errors.evDesc}</p> : null}
        </div>

        <input type="submit" className="subButton"></input>
      </form>
    </div>
  );
}

export default App;
