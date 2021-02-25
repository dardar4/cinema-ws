const UserLoginDataModel = require('../models/userLoginData');


const getUserLoginData = (userID) => {
    return UserLoginDataModel.findOne({ userID });
}

const addUserLoginData = (userID, userName, password='') => {
    const userLoginData = new UserLoginDataModel({
        userID,
        userName,
        password
    });
    return userLoginData.save();
}

const deleteUserLoginData = (userID) => {
    return UserLoginDataModel.findOneAndDelete({userID})
}

module.exports = {
    getUserLoginData,
    addUserLoginData,
    deleteUserLoginData
}