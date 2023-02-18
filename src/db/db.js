require("dotenv").config();
const mongoose = require('mongoose');
console.log('DB Connect to', process.env.MONGO_URI_LOCAL_IP, 'or', process.env.MONGO_URI_LOCAL_HOST);
mongoose.connect(process.env.MONGO_URI_LOCAL_IP).then((c) => {
    console.log('Connection successful!');
}).catch((e) => {
    console.log('Connection failed!', e);
});
// const connection = mongoose.createConnection(process.env.MONGO_URI_LOCAL_HOST, {
//     maxPoolSize: 10,
//     minPoolSize: 1,
//     serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//     socketTimeoutMS: 45000,
// });
// module.exports = connection;