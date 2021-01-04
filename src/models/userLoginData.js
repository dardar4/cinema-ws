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
        required : true,
        trim : true,
    }
})

const UserLoginDataModel = mongoose.model('userLoginData', UserLoginDataSchema);

module.exports = UserLoginDataModel;