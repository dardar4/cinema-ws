const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserLoginDataSchema = new Schema({
    userID : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'user'
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