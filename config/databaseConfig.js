const mongoose = require('mongoose');

const connect = async() =>{
    await mongoose.connect("mongodb://localhost/chatapp");
    console.log('Database connected');
}

module.exports = connect;