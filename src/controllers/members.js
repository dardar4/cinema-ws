const subscriptionsDal = require('../dal/subscriptions');
const MemberData = require('../models/memberData');


const getAllMembers = async () => {
    // Get all Members
    const result = await subscriptionsDal.getMembers();
    const members = result.data;


    const membersDataArr = await Promise.all(members.map(async (member) => {
        try{
            const res = await subscriptionsDal.getShowSubscription(member._id);
            return new MemberData(member, res.data.shows);
        }catch(err){
            //console.error('error:', err);
            return new MemberData(member)
        }
    }));

    // Get all members moviesSubscriptions
    //console.log('membersDataArr', membersDataArr[0]);
    return membersDataArr;
};

const addMember = async (memberData) => {
    // Create new Member
    const result = await subscriptionsDal.addMember(memberData);
    return result.data;
}

const updateMember = async (memberID, memberData) => {
    // Update existing Member
    const result = await subscriptionsDal.updateMember(memberID, memberData);
    return result.data;
}

const deleteMember = async (memberID) => {
    // Delete existing Member
    let result = await subscriptionsDal.deleteMember(memberID);
    const deletedMember = result.data;

    console.log(deletedMember);

    if(deletedMember){
        //Need to delete the members shows subscriptions as well
        try{
            result = await subscriptionsDal.deleteShowSubscription(memberID);
            console.log('*** result.data ****', result.data);
        }catch(e){
            console.log('*** error ****', e);
        }

    }
    
    return deletedMember;
}


module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
}