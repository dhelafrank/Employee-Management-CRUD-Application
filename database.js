const mongoose = require("mongoose");
require("dotenv").config();
const resetDatas = require("./reset")


async function connectToDatabase(log) {
    const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
    
    await mongoose.connect(uri).then(() => {
        console.log(`Database Connection Successful: ${log || ""}`);
        resetDatas()
    }).catch((err) => {
        console.error("Database Connection Error");
        console.log(err);
        process.exit()
    })
}
module.exports = {
    connectToDatabase
};