const usersDal = require('../dal/users');
const permissionsDal = require('../dal/permissions');
const UserLoginDataModel = require('../models/userLoginData');

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

    return {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdDate: newUser.createdDate,
        sessionTimeOut: newUser.sessionTimeOut,
        isAdmin: newUser.isAdmin,
        permissions : userPermissions.permissions,
        userName : newUserLoginData.userName
    };
};

const updateUser = async(userData) => { 
    return usersDal.updateUser(userData);
};

const deleteUser = async(id) => { 
    return usersDal.deleteUser(id);
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