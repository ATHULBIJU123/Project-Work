const moongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connect (){
    try {
        await moongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection established")
    } catch (error) {
        console.log("Database connection error", error)
    }
}

module.exports = connect;