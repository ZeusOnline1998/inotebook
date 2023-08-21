const mongoose = require('mongoose');

monogoURI = "mongodb://localhost:27017/"

const connectToMongo = () => {
    mongoose.connect(monogoURI)
    .then(console.log("Connected to MongoDB successfully"))
}

module.exports = connectToMongo;
