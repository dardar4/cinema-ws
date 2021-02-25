const MemberModel = require('../models/member');
const { getAllMembers } = require('../External Api/MembersApi');

module.exports = async () => {
    const numOfMembersInDB = await MemberModel.countDocuments({});
    const shouldUpdate = numOfMembersInDB === 0;

    if(shouldUpdate){
        const members = await getAllMembers();

        if(!members || members.length === 0){
            console.warn('No members in DB , but failed to retrieve any members from external API');
            return;
        }

        let membersDocs = members.map((member) => {
            return new MemberModel({
                name : member.name,
                email : member.email,
                city : member.address.city
            })
        })

        console.log(`Inserting ${membersDocs.length} members into DB...`);
        MemberModel.insertMany(membersDocs);
    }
}