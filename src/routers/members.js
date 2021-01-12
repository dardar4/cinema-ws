const express = require('express');
const { buildResponse } = require('./common');
const membersController = require('../controllers/members');

const router = express.Router();

/* Get all members */
router.get('/members', async (req, res) => {
    try{
        const members = await membersController.getAllMembers();
        res.json(buildResponse(undefined, members));
    }catch(e){
        console.error(e);
        res.status(400).json(buildResponse(e, undefined));
    }
});

/* Create new member */
router.post('/members', async(req, res) => {
    try{
        const membersData = req.body;
        const newMember = await membersController.addMember(membersData);
        
        if(!newMember){
            return res.json(buildResponse('error creating a new members', undefined));
        }
        res.json(buildResponse(undefined, newMember));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

/* Update a member */
router.patch('/members/:id', async(req, res) => {
    try{
        const memberID = req.params.id;
        const memberData = req.body;
        const updatedMember = await membersController.updateMember(memberID, memberData);

        if(!updatedMember){
            return res.json(buildResponse(`error updating Member id=${memberID}`, undefined));
        }
        res.json(buildResponse(undefined, updatedMember));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

/* Delete a member */
router.delete('/members/:id', async(req, res) => {
    try{
        const memberID = req.params.id;
        const deletedMember = await membersController.deleteMember(memberID);

        if(!deletedMember){
            return res.json(buildResponse(`error deleting member id=${memberID}`, undefined));
        }
        res.json(buildResponse(undefined, deletedMember));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

module.exports = router;