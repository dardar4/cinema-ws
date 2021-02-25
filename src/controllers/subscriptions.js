const subscriptionsDal = require('../dal/subscriptions');
const showsDal = require('../dal/shows');

const addSubscription = async (subscriptionData) => {
    const newSubscription = await subscriptionsDal.addSubscription(subscriptionData)
    
    if(!newSubscription){
        console.error('error creating a new subscription');
        return null;
    }

    const [lastShow] = subscriptionData.shows.slice(-1);
    //showsDal.addShowSubscriber(lastShow.showID, subscriptionData.memberID);
    showsDal.addShowSubscriber(lastShow.showID, newSubscription._id);

    return newSubscription;
}

const getAllSubscriptions = async () => {
    const subscriptions = await subscriptionsDal.getAllSubscriptions()
    
    if(!subscriptions){
        console.error('error retrieving subscriptions from DB');
        return [];
    }

    if(subscriptions.length === 0){
        console.warn('subscriptions list is empty');
    }

    return subscriptions;
}

const getSubscription = async (id) => {
    const subscription = await subscriptionsDal.getSubscription(id);
    
    if(!subscription){
        //console.log(`member id=${id} has no active shows subscriptions`);
    }

    return subscription;
}

const updateSubscription  = async (id, subscriptionData) => {
    const updatedSubscription = await subscriptionsDal.updateSubscription(id, subscriptionData);
    
    if(!updatedSubscription){
        console.error(`error updating subscription with id=${id}`);
    }

    const [lastShow] = subscriptionData.shows.slice(-1);
    //showsDal.addShowSubscriber(lastShow.showID, subscriptionData.memberID);
    showsDal.addShowSubscriber(lastShow.showID, updatedSubscription._id);

    return updatedSubscription;
}

const deleteSubscription = async (id) => {

    const subscription = await getSubscription(id);
    if(!subscription){
        return {}
    }

    const deletedSubscription = await subscriptionsDal.deleteSubscription(id);
    
    if(!deletedSubscription){
        console.error(`error deleting subscription with id=${id}`);
    }

    return deletedSubscription;
}

const deleteAllSubscriptions = async () => {
    const deletionResult = await subscriptionsDal.deleteAllSubscriptions();

    if(deletionResult && deletionResult.ok == 1){
        console.log(`Successfully deleted ${deletionResult.deletedCount} subscriptions from DB`);
    }
    else{
        console.log(`Error deleting all subscription from DB`);
    }
}

module.exports = {
    addSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription,
    deleteAllSubscriptions
}