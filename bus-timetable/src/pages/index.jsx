import * as React from "react"

// styles
const pageStyles = {
  color: "#232129",
  display: "flex",
  justifyContent: "spaceBetween",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
}

const calendarStyles = {
  width: "700px",
  height: "700px",
  borderWidth: "0",
  frameborder: "0",
  padding: "15px"
}

const buttonStyle = {
    display: "block",
    width: "115px",
    height: "25px",
    background: "#4E9CAF",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    lineHeight: "25px",
    alignSelf: "end"
}

const IndexPage = () => {

  return (
    <main style={pageStyles}>
      <title>St Abraam Bus timetable</title>
      <div>
        <h1 style={headingStyles}>
          Bus Timetable
        </h1>
        <a style={buttonStyle} href="/request">
          make a request
        </a>
      </div>
      <div>
        <h2 style={headingStyles}> Small bus </h2>
        <iframe style={calendarStyles} src="https://calendar.google.com/calendar/embed?height=800&wkst=1&bgcolor=%23ffffff&ctz=Australia%2FSydney&showTitle=0&showPrint=0&showTz=0&mode=WEEK&src=a3A2cWQ0YnY2ZmlxY3RzZ2Y3cDBzNnZwbjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=YmEwYjVicDZpZms2NWtzcGw0aHU4NXY1b2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA&color=%23B39DDB"></iframe>
        <p>
          Legend:
          purple is pending,
          magenta is accepted.
        </p>
      </div>
      <div>
        <h2 style={headingStyles}> Large bus </h2>
        <iframe style={calendarStyles} src="https://calendar.google.com/calendar/embed?height=800&wkst=1&bgcolor=%23ffffff&ctz=Australia%2FSydney&showTitle=0&showPrint=0&showTz=0&mode=WEEK&src=aHN2YmY5MGoyaHE4NjloYnVhY2RzZGl1dHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aXJzanBrNmhvNnFicjNtbmpva2E4cjlmZzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%237CB342"></iframe>
        <p>
          Legend:
          green is pending,
          cyan is accepted.
        </p>
      </div>
      </main>
  )
}

export default IndexPage
