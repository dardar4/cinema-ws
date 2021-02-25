const UserModel = require('../models/user');
const usersController  = require('../controllers/users');


module.exports = async () => {
    const numOUsersInDB = await UserModel.countDocuments({});
    const shouldUpdate = numOUsersInDB === 0;

    if(shouldUpdate){
        // No users in the DB - create a default admin user
        const userData = {
            firstName : 'admin',
            lastName : 'admin',
            sessionTimeOut : 60,
            isAdmin : true,
            "permissions" : [ 
                "View Subscriptions", 
                "Create Subscriptions", 
                "Delete Subscriptions", 
                "Update Subscriptions", 
                "View Shows", 
                "Create Shows", 
                "Delete Shows", 
                "Update Shows"
            ],
            userName : 'admin',
            password : 'admin'
        }
        usersController.addUser(userData);
    }
}