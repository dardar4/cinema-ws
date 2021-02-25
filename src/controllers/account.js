const accountDal = require('../dal/account');
const usersDal = require('../dal/users');
const userPermissionsDal = require('../dal/userPermissions');
const UserData = require('../models/userData');

const checkLogin = async (userName, password) => {
    const userLoginData = await accountDal.checkLogin(userName, password);
    if(!userLoginData){
        console.warn('user name or password are incorrect');
        return null;
    };

    // Get User details
    const user = await usersDal.getUser(userLoginData.userID);

    // Get User permissions
    const userPermissions = await userPermissionsDal.getUserPermissions(userLoginData.userID);

    return new UserData(
        user,
        userPermissions,
        { userName }
    );
};

const createAccount = (userName, newPassword) => {
    return accountDal.updateUserPassword(userName, newPassword);
};

module.exports = {
    checkLogin,
    createAccount
}