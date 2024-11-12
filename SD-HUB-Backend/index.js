import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

await client.connect();
console.log("Database Connected");
const db = client.db('SDHub');

app.post('/signup', async (req, res) => {
    console.log(req.body);
    const collection = db.collection('users');
    const inserted = await collection.insertOne(req.body);
    console.log(inserted);
    if(inserted.acknowledged){
        res.status(201).json({ message: "Document inserted", data: inserted});
    }
    else{
        res.status(401).json({ message: "Error adding Document", data: ''});
    }
    
});

app.post('/signin', async (req, res) => {
    console.log(req.body);

    const collection = db.collection('users');
    const userDetails = await collection.findOne(req.body);
    console.log(userDetails);

    if(userDetails != null){
        res.status(201).json({ message: "SignIn Sucessfull", data: userDetails});
    }
    else{
        res.status(401).json({ message: "Invalid Credentials", data: ''});
    }
})

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})