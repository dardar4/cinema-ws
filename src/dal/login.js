const UserLoginDataModel = require('../models/userLoginData');


const checkLogin = async (userName, password) => {
    try{
        return UserLoginDataModel.findOne({
            userName,
            password
        });
    }catch(e){
        console.error(e);
        return undefined;
    }
}

module.exports = {
    checkLogin
}