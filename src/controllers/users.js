const usersDal = require('../dal/users')

const getAllUsers = async () => {
    return await usersDal.getAllUsers();
};

const getUser = async (id) => {
    return usersDal.getUser(id);
};

const addUser = async(userData) => { 
    const newUser = await usersDal.addUser(userData);
    //console.log('controller::addUser', newUser);
    return newUser;
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