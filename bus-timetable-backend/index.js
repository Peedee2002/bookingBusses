import express from 'express'
import process from 'process';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.compose']

google.options({auth: new GoogleAuth({ scopes: SCOPES})});

app.use(express.json())
const calendars = {
  "request-bigBus": "irsjpk6ho6qbr3mnjoka8r9fg0@group.calendar.google.com",
  "request-smallBus": "ba0b5bp6ifk65kspl4hu85v5og@group.calendar.google.com",
  "confirmed-smallBus": "kp6qd4bv6fiqctsgf7p0s6vpn0@group.calendar.google.com",
  "confirmed-bigBus": "hsvbf90j2hq869hbuacdsdiuts@group.calendar.google.com"
}

app.post('/api/:bus/request', async (req, res) => {
  const calendar = google.calendar({ version: 'v3' });
  const e = await calendar.events.insert({
    calendarId: calendars[`request-${req.params.bus}`],
    resource: {
      summary: req.body.fullName,
      description: `${req.body.evDesc}\n\n CONTACT PROVIDED: ${req.body.email}`,
      end: {
        dateTime: new Date(req.body.end),
        timeZone: 'Australia/Sydney'
      },
      start: {
        dateTime:new Date(req.body.start),
        timeZone: 'Australia/Sydney'
      },
    }
  })
  const gmail = google.gmail({ version: 'v1' });
  const message = "From: peter.derias@gmail.com\r\n" + `To: ${process.env.SERVANT_EMAILS}\r\n` + `Subject: Automated Request for booking Church bus\r\n\r\n` +
  `a request has been lodged by servant ${req.body.fullName} at ${process.env.FRONTEND_URL} for the ${req.params.bus}\r\n` +
  `the booking is from ${new Date(req.body.start).toString()} to ${new Date(req.body.end).toString()}.\r\n` +
  `They say they need it for this reason:\r\n` +
  `${req.body.evDesc}\r\n\r\n\r\n` +
  `The email they provided for contact is: ${req.body.email}\r\n` +
  `To accept this request, go to this URL: ${process.env.BACKEND_URL}/api/${req.params.bus}/accept/${e.data.id}\r\n\r\n`+
  `Thanks for your service :)`
  gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: Buffer.from(message).toString('base64')
    }
  })

  // make an email to ppl
  res.send(`${process.env.BACKEND_URL}/api/${req.params.bus}/accept/${e.data.id}`);
});

app.get('/api/:bus/accept/:eventId', async (req, res) => {
  const calendar = google.calendar({ version: 'v3' });
  const event = await calendar.events.get({
    calendarId: calendars[`request-${req.params.bus}`],
    eventId: req.params.eventId
  })

  await calendar.events.delete({
    calendarId: calendars[`request-${req.params.bus}`],
    eventId: req.params.eventId
  })

  await calendar.events.insert({
    calendarId: calendars[`confirmed-${req.params.bus}`],
    resource: event.data
  })

  res.send("satisfied!");
});

app.listen(3000);
console.log("listening");
