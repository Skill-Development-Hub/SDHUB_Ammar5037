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
});

app.post('/addstudents', async (req, res) => {
    console.log(req.body);
    const inserted = await collection.insertMany([req.body]);
    console.log(inserted);
    // const newStudent = new Students(req.body);
    // await newStudent.save();
    res.status(201).json(inserted);
})

app.get('/users', async (req, res) => {
        const users = await collection.find({}).toArray(); 
        res.status(200).json(users);
});

app.get('/gettech', async (req, res) => {
    const collection = db.collection('trainers');
    const gettech = await collection.find({}).toArray(); 
    res.status(200).json(gettech);
});

app.get('/studentsStatus', async (req, res) => {
    const collection = db.collection('students');
    const std_status = await collection.aggregate([ { $group: { _id: "$status", count: { $sum: 1 } }} ]).toArray();

    if(std_status != null){
        res.status(201).json(std_status);
    }
    else{
        res.status(401).json({ message: 'No Data'});
    }
});

app.get('/tStatus', async (req, res) => {
    const collection = db.collection('trainers');
    const t_status = await collection.aggregate([ { $group: { _id: "$status", count: { $sum: 1 } }} ]).toArray();

    if(t_status != null){
        res.status(201).json(t_status);
    }
    else{
        res.status(401).json({ message: 'No Data'});
    }
});

// student table
app.get('/students', async (req, res) => {
    const collection = db.collection('students');
    const students = await collection.find({}).toArray(); 
    res.status(200).json(students);
});

app.get('/trainers', async (req, res) => {
    const collection = db.collection('trainers');
    const students = await collection.find({}).toArray(); 
    res.status(200).json(students);
});

app.get('/deans', async (req, res) => {
    const collection = db.collection('deans');
    const students = await collection.find({}).toArray(); 
    res.status(200).json(students);
});

app.get('/courses', async (req, res) => {
    const collection = db.collection('courses');
    const courses = await collection.find({}).toArray(); 
    res.status(200).json(courses);
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})