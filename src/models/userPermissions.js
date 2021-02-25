const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPermissionsSchema = new Schema({
    userID : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'user'
    },
    permissions : [{
        type : String,
        required : true
    }]

});


const UserPermissionsModel = mongoose.model('user-permissions', UserPermissionsSchema);

module.exports = UserPermissionsModel;