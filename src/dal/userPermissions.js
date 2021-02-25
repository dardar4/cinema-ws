const UserPermissionModel = require('../models/userPermissions');

const getAllUsersPermissions = () => {
    return UserPermissionModel.find({});
}

const getUserPermissions = (userID) => {
    return UserPermissionModel.findOne({userID});
}

const addUserPermissions = async (userID, permissionArr) => {
    const userPermissions = new UserPermissionModel({
        userID,
        permissions : permissionArr
    });
    return userPermissions.save();
 }

 const updateUserPermissions = async (userID, permissionArr) => {
    const filter = { userID };
    const update = { permissions : permissionArr };
    return UserPermissionModel.findOneAndUpdate(filter, update, {new : true})
 }

const deleteUserPermissions = (userID) => {
    return UserPermissionModel.findOneAndDelete({userID});
}

const deleteAllUsersPermissions = () => {
    return UserPermissionModel.deleteMany({});
}

module.exports = {
    getAllUsersPermissions,
    getUserPermissions,
    addUserPermissions,
    updateUserPermissions,
    deleteUserPermissions,
    deleteAllUsersPermissions
}