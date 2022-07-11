import express from 'express'
import { MongoClient } from 'mongodb'

const app = express()

app.use(express.json())

const client = new MongoClient("mongodb://user:user@localhost:27017");
// databases inside connection
const db = client.db("busses");
// multiple collections possible

app.get('/api/get/:bus/:timeStart', (req, res) => {
    const conn = db.collection(req.params.bus);
    res.send(conn.find().toArray());
});

app.post('/api/request', (req, res) => {
    const conn = db.collection(req.params.bus);
    conn.insertOne({
        ...req.body,
        approved: false
    });
    // make an email to ppl
    res.send("satisfied");
});

app.post('/api/accept', (req, res) => {
        conn = db.collection(req.params.bus);
        const item = conn.findOne((item) => item._id == req.body.id);
        item.approved = true;
        conn.replaceOne((i) => i._id == req.body.id, item);
        res.send("satisfied!");

});

app.listen(3000)
