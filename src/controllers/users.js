const usersDal = require('../dal/users');
const permissionsDal = require('../dal/permissions');
const UserLoginDataModel = require('../models/userLoginData');
const UserData = require('../models/userData');

const getAllUsers = async () => {
    // Get all users data
    const users = await usersDal.getAllUsers();

    // for each user get it's permissions and userName
    const usersFullDataArr = await Promise.all(users.map(async (user) => {
        // get user permissions
        const permissions = await permissionsDal.getUserPermissions(user.id);

        const userLoginData = await UserLoginDataModel.findOne({
            userID : user.id
        })

        return {
            ...user,
            permissions,
            userName : userLoginData.userName
        }
    }));

    return usersFullDataArr;
};

const getUser = async (id) => {
    return usersDal.getUser(id);
};

const addUser = async(userData) => { 
    // Add new user
    const newUser = await usersDal.addUser(userData);

    if(!newUser){
        console.error('error creating a new user');
        return null;
    }

    // Add user permissions
    const userPermissions = await permissionsDal.addUserPermissions(newUser.id, userData.permissions);

    if(!userPermissions){
        console.error('error creating user permissions');
        return null;
    }
    
    //Add user name to login data
    const userLoginData = new UserLoginDataModel({
        userID : newUser.id,
        userName : userData.userName,
        password : ""
    });
    const newUserLoginData = await userLoginData.save();

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

const updateUser = async(userId, userData) => { 
    // Update user data
    const updatedUser = await usersDal.updateUser(userId, userData);

    if(!updatedUser){
        console.error(`error updating user id=${userData.id}`);
        return null;
    }

    // Update user permissions
    const updatedUserPermissions = await permissionsDal.updateUserPermissions(userId, userData.permissions);

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

const deleteUser = async(id) => { 
    // Delete user data
    const deletedUser = await usersDal.deleteUser(id);

    if(!deletedUser){
        console.error(`error deleting user id=${id}`);
        return null;
    }

    // Delete user permissions
    const deletedPermissions = await permissionsDal.deleteUserPermissions(id);

    if(!deletedPermissions){
        console.error(`error deleting user id=${id} permissions`);
        return null;
    }

    // Delete user login data
    const deletedUserLoginData = await UserLoginDataModel.findOneAndDelete({
        userID : id
    });

    if(!deletedUserLoginData){
        console.error(`error deleting user id=${id} login data`);
        return null;
    }

    return new UserData(
        deletedUser,
        deletedPermissions,
        deletedUserLoginData
    );
};

const deleteAllUsers = async() => {
    return usersDal.deleteAllUsers();
}


module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
}