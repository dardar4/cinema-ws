const jsonfile = require('jsonfile');

const file = '../fs/usersPermissions.json';

const getAllUsersPermissions = async () => {
    const usersPermissions = await jsonfile.readFile(file);
    return usersPermissions;
}

const getUserPermission = async (userId) => {
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

    
    return userPermission[0];
}


const addUserPermission = async(userId, permissionArr) => {
    let usersPermissions = await getAllUsersPermissions();

    const userPermission = {
        userID : userId,
        permissions : permissionArr
    };

    const newUsersPermissionArr = [...usersPermissions, userPermission];

    jsonfile.writeFile(file, newUsersPermissionArr, (err) => {
        if (err) {
            console.error(err) 
        }
    });
}

const updateUserPermission = async(userId, permissionArr) => {
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

const deleteUserPermission = async(userId) => {
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
    getUserPermission,
    addUserPermission,
    updateUserPermission,
    deleteUserPermission
}
