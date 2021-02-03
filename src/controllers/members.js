const subscriptionsDal = require('../dal/subscriptions');
const MemberData = require('../models/memberData');


const getAllMembers = async () => {
    // Get all Members (with their shows subscriptions)
    const result = await subscriptionsDal.getMembers();
    const members = result.data;
    return members;
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
    return result.data;
}


module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
}