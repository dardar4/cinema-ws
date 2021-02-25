const membersDal = require('../dal/members')

const addMember = async (memberData) => {
    const newMember = await membersDal.addMember(memberData)
    
    if(!newMember){
        console.error('error creating a new member');
        return null;
    }

    return newMember;
}

const getAllMembers = async () => {
    const members = await membersDal.getAllMembers()
    
    if(!members){
        console.error('error retrieving members from DB');
        return null;
    }

    if(members.length === 0){
        console.warn('members list is empty');
    }

    return members;
}

const getMember = async (id) => {
    const member = await membersDal.getMember(id);
    
    if(!member){
        console.error(`error retrieving member with id=${id}`);
        return null;
    }

    return member;
}

const updateMember  = async (id, memberData) => {
    const updatedMember = await membersDal.updateMember(id, memberData);
    
    if(!updatedMember){
        console.error(`error updating member with id=${id}`);
        return null;
    }

    return updatedMember;
}

const deleteMember = async (id) => {
    const deletedMember = await membersDal.deleteMember(id);
    
    if(!deletedMember){
        console.error(`error deleting member with id=${id}`);
        return null;
    }

    return deletedMember;
}

const deleteAllMembers = async () => {
    const deletionResult = await membersDal
    .deleteAllMembers();

    if(deletionResult && deletionResult.ok == 1){
        console.log(`Successfully deleted ${deletionResult.deletedCount} members from DB`);
    }
    else{
        console.log(`Error deleting all members from DB`);
    }
}

module.exports = {
    addMember,
    getAllMembers,
    getMember,
    updateMember,
    deleteMember,
    deleteAllMembers
}