import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()

app.use(express.json())

const client = new MongoClient("mongodb://user:user@localhost:27017");
// databases inside connection
const db = client.db("busses");
// multiple collections possible

app.get('/api/:bus/get/:timeStart', async (req, res) => {
    const conn = db.collection(req.params.bus);
    console.log(conn.collectionName);
    res.send({times: await conn.find().toArray()});
});

app.post('/api/:bus/request', async (req, res) => {
    // validated by FE
    const conn = db.collection(req.params.bus);
    const value = await conn.insertOne({
        ...req.body,
        approved: false
    });
    // make an email to ppl
    res.send("satisfied");
});

app.post('/api/:bus/accept', async (req, res) => {
        const conn = db.collection(req.params.bus);
        const query = { _id: new ObjectId(req.body.id) };
        const item = await conn.findOne(query);
        item.approved = true;
        conn.replaceOne(query, item);
        res.send("satisfied!");
});

app.listen(3000);
console.log("listening");
