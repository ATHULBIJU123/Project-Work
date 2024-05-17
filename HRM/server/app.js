const express = require('express');
const app = express();
const connect = require('./db/config')
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const dotenv = require('dotenv');
dotenv.config();

//Database connection //
connect();

//client
app.use(express.static(__dirname + '/../client'));

//Parsing form datas
app.use(express.urlencoded(({extended: true})));

//Parsing JSON datas
app.use(express.json());

//userRoutes
app.use(userRoutes);

//authRoutes
app.use(authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

