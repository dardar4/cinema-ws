const ShowModel = require('../models/show');

const getNextId = async () => {
    const latestShow = await ShowModel.findOne({}).sort('-showID');
    let nextId = latestShow.showID + 1;
    return nextId;
}

const addShow = async (showData) => {
    let showToAdd = new ShowModel({
        showID : await getNextId(),
        ...showData
    });

    return showToAdd.save();
}

const getAllShows = () => {
    return ShowModel.find({}).populate('subscribers');
}

const getShow = (id) => {
    return ShowModel.findOne({
        showID : id
    });
}

const updateShow = (id, memberData) => {
    return ShowModel.findOneAndUpdate({ showID : id }, memberData, {
        new : true, // returns the new show
        runValidators : true // validate the updated object
    });
}

const deleteShow = (id) => {
    return ShowModel.findOneAndDelete({ showID : id });
}

const deleteAllShows = () => {
    return ShowModel.deleteMany({});
}

const addShowSubscriber = async (showID,  memberID) => {
    try{
        const show = await ShowModel.findOne({showID});

        if(!show){
            console.log('show not found', showID)
            return;
        }

        show.subscribers = [...show.subscribers, memberID];
        return show.save();
    }catch(e){
        console.error(e);
    }

}

module.exports = {
    addShow,
    getAllShows,
    getShow,
    updateShow,
    deleteShow,
    deleteAllShows,
    addShowSubscriber
}