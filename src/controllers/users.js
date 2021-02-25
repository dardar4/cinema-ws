const usersDal = require('../dal/users');
const userPermissionsDal = require('../dal/userPermissions');
const UserLoginDataDal = require('../dal/UserLoginData');
const UserData = require('../models/userData');

const getAllUsers = async () => {
    // Get all users data
    const users = await usersDal.getAllUsers();

    // For each user get it's permissions and userName
    const usersFullDataArr = await Promise.all(users.map(async (user) => {
        // Get user permissions
        const userPermissions = await userPermissionsDal.getUserPermissions(user._id);
        // Get user name
        const userLoginData = await UserLoginDataDal.getUserLoginData(user._id);

        return new UserData(
            user,
            userPermissions,
            userLoginData
        );
    }));

    return usersFullDataArr;
};

const getUser = async (userID) => {
    return usersDal.getUser(userID);
};

const addUser = async(userData) => { 
    // Add new user
    const newUser = await usersDal.addUser(userData);

    if(!newUser){
        console.error('error creating a new user');
        return null;
    }

    // Add user permissions
    const userPermissions = await userPermissionsDal.addUserPermissions(newUser._id, userData.permissions);

    if(!userPermissions){
        console.error('error creating user permissions');
        return null;
    }
    
    // Add user login data (with only user name)
    const newUserLoginData = await UserLoginDataDal.addUserLoginData(newUser._id, userData.userName, userData.password);

    if(!newUserLoginData){
        console.error('error creating user login data');
        return null;
    }

    return new UserData(
        newUser,
        userPermissions,
        newUserLoginData
    );
};

const updateUser = async(userID, userData) => { 
    // Update user data
    const updatedUser = await usersDal.updateUser(userID, userData);

    if(!updatedUser){
        console.error(`error updating user id=${userData.id}`);
        return null;
    }

    // Update user permissions
    const updatedUserPermissions = await userPermissionsDal.updateUserPermissions(userID, userData.permissions);

    if(!updatedUserPermissions){
        console.error(`error updating user id=${userData.id} permissions`);
        return null;
    }

    return new UserData(
        updatedUser,
        updatedUserPermissions,
        undefined
    );
};

const deleteUser = async(userID) => { 
    // Delete user data
    const deletedUser = await usersDal.deleteUser(userID);

    if(!deletedUser){
        console.error(`error deleting user id=${userID}`);
        return null;
    }

    // Delete user permissions
    const deletedPermissions = await userPermissionsDal.deleteUserPermissions(userID);

    if(!deletedPermissions){
        console.error(`error deleting user id=${userID} permissions`);
        return null;
    }

    // Delete user login data
    const deletedUserLoginData = await UserLoginDataDal.deleteUserLoginData(userID);

    if(!deletedUserLoginData){
        console.error(`error deleting user id=${userID} login data`);
        return null;
    }

    return new UserData(
        deletedUser,
        deletedPermissions,
        deletedUserLoginData
    );
};

const deleteAllUsers = async(deleteAdmin) => {
    return usersDal.deleteAllUsers(deleteAdmin);
}


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
}