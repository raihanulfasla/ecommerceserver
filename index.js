import express, { json, response } from "express";
import cors from "cors"
import mongoose from "mongoose";


const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1.:27017/new_dbms").then((res) => {
    console.log('connected');
}).catch((err) => {
    console.log('DB error', err);
})

app.get("/", (req, res) => {
    console.log("get");
    res.send();

})

app.post('/api/register', (req, res) => {
    console.log(req.body);

    mongoose.connection.collection('users').insertOne(req.body).then((response) => {
        res.json({ message: 'successfully inserted user into db' });
    });

})

app.post('/api/login', async(req, res) => {
    console.log(req.body);

    let response = await mongoose.connection.collection('users')
        .find({ email: req.body.email, password: req.body.password }).toArray();

    console.log(response, "response");

    if (response) {
        res.status(200).json({ uses: response, message: 'Successfull' })
    }

    else {
        res.status(400).json({ message: "Invalid Email or Password" })
    }
});


app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})