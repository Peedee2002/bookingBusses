import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import TimeTable from "react-timetable-events"
// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const IndexPage = () => {
  const [data, setData] = useState({});
  const [bus, setBus] = useState("");
  const [timeStart, setTimeStart] = useState("");
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/get/${bus}/${timeStart}`)
  // })
  return (
    <main style={pageStyles}>
      <title>St Abraam Bus timetable</title>
      <a href="/request">
        make a request
      </a>
      
      <h1 style={headingStyles}>
        Bus TimeTable
      </h1>
      <TimeTable
        events={{
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        }}
        style={{ height: '500px' }}
      />
    </main>
  )
}

export default IndexPage
