const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase(log) {
    const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
    await mongoose.connect(uri).then(()=>{console.log(`Database Connection Successful: ${log || ""}`)}).catch((err)=>{console.log("Database Connection Error");console.log(err);})
}
module.exports = { connectToDatabase };