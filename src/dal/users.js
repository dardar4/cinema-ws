const UserModel = require('../models/user');

const getAllUsers = () => {
    return UserModel.find({});
}

const getUser = (userID) => {
    return UserModel.findById(userID);
}

const addUser = async (userData) => {
    const user = new UserModel(userData);
    return user.save();
 }

const updateUser = async(userID, userData) => { 
    return UserModel.findByIdAndUpdate(userID, userData, {
        new : true, // returns the new user
        runValidators : true // validate the updated object
    });
}

const deleteUser = (userID) => {
    return UserModel.findByIdAndDelete(userID);
}

const deleteAllUsers = (deleteAdmin) => {
    if(deleteAdmin){
        return UserModel.deleteMany({});
    }
    else{
        return UserModel.deleteMany({
            isAdmin : false
        });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
}