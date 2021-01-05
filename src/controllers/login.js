const loginDal = require('../dal/login');
const usersDal = require('../dal/users');
const permissionsDal = require('../dal/permissions');

const checkLogin = async (userName, password) => {
    const userLoginData = await loginDal.checkLogin(userName, password);
    if(!userLoginData){
        console.warn('user name or password are incorrect');
        return null;
    }

    // Get User details
    const userDetails = await usersDal.getUser(userLoginData.userID);

    // Get User permissions
    const permissions = await permissionsDal.getUserPermissions(userLoginData.userID);

    return {
        id : userDetails.id,
        fullName : `${userDetails.firstName} ${userDetails.lastName}`,
        sessionTO : userDetails.sessionTimeOut,
        isAdmin : userDetails.isAdmin,
        permissions,
        userName,
    }
};

module.exports = {
    checkLogin
}