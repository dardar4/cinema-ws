class ShowWithSubscribersData {
    constructor({ _id, name, showID, imageURL, premiered, genres }, showSubscriptions = []){
        this._id = _id;
        this.name = name;
        this.showID = showID;
        this.imageURL = imageURL;
        this.premiered = premiered;
        this.genres = genres;
        this.showSubscriptions = showSubscriptions;
    }
}  


module.exports = ShowWithSubscribersData;