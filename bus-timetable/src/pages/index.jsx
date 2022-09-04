import * as React from "react"

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

const calendarStyles = {
  border: "solid 1px #777",
  width: "1000px",
  height: "800px",
}

const IndexPage = () => {

  return (
    <main style={pageStyles}>
      <title>St Abraam Bus timetable</title>
      <a href="/request">
        make a request
      </a>

      <h1 style={headingStyles}>
        Bus TimeTable
      </h1>
      <iframe style={calendarStyles} src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Australia%2FSydney&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showDate=1&src=aHN2YmY5MGoyaHE4NjloYnVhY2RzZGl1dHNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=a3A2cWQ0YnY2ZmlxY3RzZ2Y3cDBzNnZwbjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aXJzanBrNmhvNnFicjNtbmpva2E4cjlmZzBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=YmEwYjVicDZpZms2NWtzcGw0aHU4NXY1b2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23A79B8E&color=%238E24AA&color=%23795548&color=%23A79B8E"></iframe>
      </main>
  )
}

export default IndexPage
