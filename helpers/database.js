const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/deneme', {useNewUrlParser: true});
    mongoose.connection.on('open', () => {
        console.log("connect");
    });

    mongoose.connection.on('error', (err) => {
        console.log("err" + err);
    });
};