const mongoose = require('mongoose');

module.exports = () => {
	// mongodb://{host}:27017/{password}
    mongoose.connect('mongodb://localhost:27017/deneme', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useCreateIndex', true);
    mongoose.connection.on('open', () => {
        console.log("connect");
    });

    mongoose.connection.on('error', (err) => {
        console.log("err" + err);
    });
};