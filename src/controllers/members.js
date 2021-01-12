const subscriptionsDal = require('../dal/subscriptions');


const getAllMembers = async () => {
    // Get all Members
    const result = await subscriptionsDal.getMembers();
    return result.data;
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
    const result = await subscriptionsDal.deleteMember(memberID);
    return result.data;
}


module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
}