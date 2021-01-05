const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserLoginDataSchema = new Schema({
    userID : {
        type : Number,
        required : true
    },
    userName : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        trim : true,
    }
})

const UserLoginDataModel = mongoose.model('user-login-data', UserLoginDataSchema);

module.exports = UserLoginDataModel;