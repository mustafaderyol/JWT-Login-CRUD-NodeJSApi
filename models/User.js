const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLenght: 4,
        maxLenght: 255,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: 5
    },
    insertDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);