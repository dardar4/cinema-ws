const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
    },
    createdDate : {
        type : Date,
        default: Date.now
    },
    sessionTimeOut : {
        type : Number,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
});


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;