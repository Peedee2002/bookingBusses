import express from 'express'
import MongoClient from 'mongodb'

app = express()

app.use(express.json())

client = new MongoClient("mongodb://user:user@localhost:27017");
client.connect();
// databases inside connection
const db = client.db('bookingBusses');
// multiple collections possible


app.get('/api/get/:bus', (req, res) => {
    db.connect(req.params.bus)
    res.send()
})

app.post('/api/request', (req, res) => {
    req.body.startTime
    req.body.endTime
    req.body.driver
    req.body.booker
    req.body.bus
})

app.post('/api/accept', (req,res) => {
    connection = db.connect(req.params.bus)
    req.body.bus
    req.body.id
    // change connection to be accepted
})

app.listen(3000)