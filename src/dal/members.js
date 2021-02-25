const MemberModel = require('../models/member');

const addMember = (memberData) => {
    const member = new MemberModel(memberData);
    return member.save();
}

const getAllMembers = async () => {
    const members = await MemberModel.find({});

    const membersWithSubscription = await Promise.all(members.map(async (member) => {
        await member.populate('showsSubscriptions').execPopulate();

        let showsSubscriptions = []
        if(member.showsSubscriptions && member.showsSubscriptions[0] && member.showsSubscriptions[0].shows){
            showsSubscriptions = member.showsSubscriptions[0].shows;
        }

        return {
            ...member._doc, 
            showsSubscriptions
        }
    }));

    return membersWithSubscription;
}

const getMember = (id) => {
    return MemberModel.findById(id);
}

const updateMember = (id, memberData) => {
    return MemberModel.findByIdAndUpdate(id, memberData, {
        new : true, // returns the new user
        runValidators : true // validate the updated object
    });
}

const deleteMember = (id) => {
    return MemberModel.findByIdAndDelete(id);
}

const deleteAllMembers = () => {
    return MemberModel.deleteMany({});
}

module.exports = {
    addMember,
    getAllMembers,
    getMember,
    updateMember,
    deleteMember,
    deleteAllMembers
}