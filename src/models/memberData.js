class MemberData {
    constructor({ _id, name, email, city }, showsSubscriptions = []){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.city = city;
        this.showsSubscriptions = showsSubscriptions;
    }
}  


module.exports = MemberData;