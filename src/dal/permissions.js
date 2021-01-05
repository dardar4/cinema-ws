const jsonfile = require('jsonfile');
var path = require('path');

const file = path.join(__dirname, '../fs/usersPermissions.json');

const getAllUsersPermissions = async () => {
    try{
        return jsonfile.readFile(file);
    }catch(e){
        console.error(e);
        return [];
    }
}

const getUserPermissions = async (userId) => {
    let usersPermissions = await getAllUsersPermissions();

    if(!usersPermissions){
        return {
            error : `No users permissions`
        } 
    }

    let userPermission = usersPermissions.filter((userPermission) => {
        return userPermission.userID === userId
    });

    if(!userPermission){
        return {
            error : `User with id=${userId} has no permissions`
        }
    }

    return userPermission[0].permissions;
}


const addUserPermissions = async(userId, permissionArr) => {
    if(permissionArr.length === 0){
        return null;
    }

    let usersPermissions = await getAllUsersPermissions();

    const userPermissions = {
        userID : userId,
        permissions : permissionArr
    };

    const newUsersPermissionsArr = [...usersPermissions, userPermissions];

    await jsonfile.writeFile(file, newUsersPermissionsArr, (err) => {
        if (err) {
            console.error(err) 
        }
    });
 
    return userPermissions;
}

const updateUserPermissions = async(userId, permissionArr) => {
    let usersPermissions = await getAllUsersPermissions();

    if(!usersPermissions){
        return {
            error : `No users permission`
        }
    }

    const index = usersPermissions.findIndex((userPermission) => {
        return userPermission.userID === userId
    });
    
    if(index === -1){
        return {
            error : `User with id=${userData.id} has no permissions`
        }
    }

    usersPermissions[index].permissions = permissionArr;

    jsonfile.writeFile(file, usersPermissions, (err) => {
        if (err) {
            console.error(err) 
        }
    });
}

const deleteUserPermissions = async(userId) => {
    let usersPermissions = await getAllUsersPermissions();

    if(!usersPermissions){
        return {
            error : `No users permissions`
        }
    }

    const index = usersPermissions.findIndex((userPermission) => {
        return userPermission.userID === userId
    });

    if(index === -1){
        return {
            error : `User with id=${userData.id} has no permissions`
        }
    }

    usersPermissions.splice(index, 1);

    jsonfile.writeFile(file, usersPermissions, (err) => {
        if (err) {
            console.error(err) 
        }
    });
}

module.exports = {
    getAllUsersPermissions,
    getUserPermissions,
    addUserPermissions,
    updateUserPermissions,
    deleteUserPermissions
}
