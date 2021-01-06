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

const updateUserPassword = (userName, newPassword) => {
    const filter = { userName };
    const update = { password : newPassword };

    try{
        return UserLoginDataModel.findOneAndUpdate(filter, update, {new : true});
    }catch(e){
        console.error(e);
        return undefined;
    }
}

module.exports = {
    checkLogin,
    updateUserPassword
}