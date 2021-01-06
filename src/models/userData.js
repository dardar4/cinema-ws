class UserData {
    constructor({ id, firstName, lastName, createdDate, sessionTimeOut, isAdmin }, { permissions }, { userName } = {}){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdDate = createdDate;
        this.sessionTimeOut = sessionTimeOut;
        this.isAdmin = isAdmin;
        this.permissions = permissions;
        this.userName = userName;
    }
}  


module.exports = UserData;