const showsDal = require('../dal/shows');
const membersDal = require('../dal/members');
const ShowWithSubscribersData = require('../models/showWithSubscribersData')

const addShow = async (showData) => {
    const newShow = await showsDal.addShow(showData)
    
    if(!newShow){
        console.error('error creating a new show');
        return null;
    }

    return newShow;
}

const getAllShows = async () => {
    const shows = await showsDal.getAllShows()
    
    if(!shows){
        console.error('error retrieving shows from DB');
        return null;
    }

    let allShowsArr = [];
    if(shows.length === 0){
        console.warn('shows list is empty');
    }
    else{
        // For each show filter the subscription date 

        for (const show of shows){
            let showSubscriberDataArr =[];
            if(show.subscribers.length > 0)
            {
                showSubscriberDataArr = await Promise.all(show.subscribers.map(async(subscriber) => {
                    const arr = subscriber.shows.filter((showSub) => {
                        return showSub.showID === show.showID;
                    })

                    const member = await membersDal.getMember(subscriber.memberID);

                    return {
                        memberID : subscriber.memberID,
                        memberName : member.name,
                        subscriptionDate : arr[0].date
                    }
                }))
            }

            let showWithSubscribersData = new ShowWithSubscribersData(show, showSubscriberDataArr);
            allShowsArr.push(showWithSubscribersData)
        }
    }

    return allShowsArr;
}

const getShow = async (id) => {
    const show = await showsDal.getShow(id);
    
    if(!show){
        console.error(`error retrieving show with id=${id}`);
        return null;
    }

    return show;
}

const updateShow  = async (id, showData) => {
    const updatedShow = await showsDal.updateShow(id, showData);
    
    if(!updatedShow){
        console.error(`error updating show with id=${id}`);
        return null;
    }

    return updatedShow;
}

const deleteShow = async (id) => {
    const deletedShow = await showsDal.deleteShow(id);
    
    if(!deletedShow){
        console.error(`error deleting show with id=${id}`);
        return null;
    }

    return deletedShow;
}

const deleteAllShows = async () => {
    const deletionResult = await showsDal.deleteAllShows();

    if(deletionResult && deletionResult.ok == 1){
        console.log(`Successfully deleted ${deletionResult.deletedCount} shows from DB`);
    }
    else{
        console.log(`Error deleting all show from DB`);
    }
}

module.exports = {
    addShow,
    getAllShows,
    getShow,
    updateShow,
    deleteShow,
    deleteAllShows
}