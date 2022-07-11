import React from "react";
import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './index.module.css';

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
      evDesc:''
    },

    
    validationSchema: Yup.object({
      fullName: Yup.string().required("Please fill in your name"),
      email: Yup.string()
        .email("Please check that this is a correct email")
        .required("Please fill in your email"),
      
      evDesc: Yup.string().required("Please describe your event"),

      dateStart: Yup.date().min(today, "Please check this start date").required("Please fill in the event's start date"),
      dateEnd: Yup.date().min(Yup.ref('dateStart'), "Please check this end date").required("Please fill in the event's end date"),

      timeStart: Yup.string().required("Please fill in the time that this event starts at"),
      timeEnd: Yup.string().required("Please fill in the time that this event ends at"),

      evDesc: Yup.string().required("Please describe your event"),
      
    }),
    
    onSubmit: (values) =>{
      setShowResults(true)
      alert(JSON.stringify(values, null, 4))

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
            <label for="dateStart" >Event Starts</label>
            <input id="dateStart" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateStart} type="date" className="dateStart" ></input> 
            {formik.touched.dateStart && formik.errors.dateStart ? <p>{formik.errors.dateStart}</p> : null}
          </div>
          
          <div className="dates">
            <label for="dateEnd">And the Event Ends</label>
            <input id="dateEnd" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.dateEnd} type="date" className="dateEnd" ></input>
            {formik.touched.dateEnd && formik.errors.dateEnd ? <p>{formik.errors.dateEnd}</p> : null}
          </div>
          
        </div>
      
        <div className="dateInput">          
          <div className="dates">
            <label for="timeStart" >At:</label>
            <input id="timeStart" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.timeStart} type="time" className="timeStart" ></input> 
            {formik.touched.timeStart && formik.errors.timeStart ? <p>{formik.errors.timeStart}</p> : null}
          </div>
           
          <div className="dates">
            <label for="timeEnd">At:</label>
            <input id="timeEnd" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.timeEnd} type="time" className="timeEnd" ></input>
            {formik.touched.timeEnd && formik.errors.timeEnd ? <p>{formik.errors.timeEnd}</p> : null}
          </div>
        </div>
      </div>

      <div className="checkBoxes">
        <legend className="labelBus">Please select which bus/buses you would like to book:</legend>
        <input type="checkbox" className="smallChoice" name="buses" value="smallBus" id="buses"/>
        <label className="busCheck" for="smallChoice">Smaller Bus (Capacity of 14)</label><br></br>
        <input type="checkbox" className="bigChoice" name="buses" value="bigBus" id="buses"/>
        <label className="busCheck" for="bigChoice">Big Bus (Capacity of 21)</label>
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
