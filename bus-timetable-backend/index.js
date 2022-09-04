import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import dayjs from 'dayjs'

const app = express()

app.use(express.json())


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
