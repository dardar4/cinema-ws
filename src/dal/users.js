const jsonfile = require('jsonfile');
var path = require('path');

const file = path.join(__dirname, '../fs/users.json');

const getNextId = (users) => {
    if(!users || users.length === 0){
        return 1;
    }

    var lastUser = users[users.length - 1];
    let nextIndex = lastUser.id + 1;
    return nextIndex;
}

const getAllUsers = async () => {
    try{
        return jsonfile.readFile(file);
    }catch(e){
        console.error(e);
    }

}

const getUser = async (id) => {
    let users = await getAllUsers();

    if(!users){
        return {
            error : `No users`
        }
    }

    let user = users.filter((user) => {
        return user.id === id
    });

    if(!user || !user[0]){
        return {
            error : `User with id=${id} not found`
        }
    }

    return user[0];
}

const addUser = async(userData) => {
    let users = await getAllUsers();
    const id = getNextId(users);

    const user = {
        id,
        firstName : userData.firstName,
        lastName : userData.lastName,
        createdDate : new Date().toDateString(),
        sessionTimeOut : userData.sessionTimeOut,
        isAdmin : false
    };

    const newUsersArr = [...users, user];

    try{
        await jsonfile.writeFile(file, newUsersArr);
        return user;
    } catch(err){
        throw new Error(`failed writing user to json. error:${err}`)  
    }
}

const updateUser = async(userId, userData) => {
    let users = await getAllUsers();

    if(!users){
        return {
            error : `No users`
        }
    }

    const index = users.findIndex((user) => {
        return user.id === userId
    });

    if(index === -1){
        return {
            error : `User with id=${userData.id} not found`
        }
    }

    const userDataToUpdate = {
        ...users[index],
        firstName : userData.firstName,
        lastName : userData.lastName,
        sessionTimeOut : userData.sessionTimeOut
    }

    users.splice(index, 1, userDataToUpdate);

    try{
        await jsonfile.writeFile(file, users);
        return userDataToUpdate;
    } catch(err){
        throw new Error(`failed updating user to json. error:${err}`)  
    }
}

const deleteUser = async(id) => {
    let users = await getAllUsers();

    if(!users){
        return {
            error : `No users`
        }
    }

    const index = users.findIndex((user) => {
        return user.id === id
    });

    if(index === -1){
        return {
            error : `User with id=${userData.id} not found`
        }
    }

    const deletedUser = users[index];
    users.splice(index, 1);

    try{
        await jsonfile.writeFile(file, users);
        return deletedUser;
    } catch(err){
        throw new Error(`failed deleting user from json. error:${err}`);
    }
}

const deleteAllUsers = async() => {
    let users = await getAllUsers();

    let onlyAdmins =  users.filter((user) => {
        return user.isAdmin 
    });

    console.log(onlyAdmins);

    jsonfile.writeFile(file, onlyAdmins, (err) => {
        if (err) {
            throw new Error(`failed deleting all users from json. error:${err}`)  
        }
    });
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    deleteAllUsers
}