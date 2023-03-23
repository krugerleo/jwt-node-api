const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(()=>{
        console.log("Succesfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. eiting now...");
        console.log(error);
        process.exit(1);
    });
}