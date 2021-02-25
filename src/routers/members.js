const express = require('express');
const { isValidRequest, buildResponse } = require('./common');
const membersController = require('../controllers/members');

const router = express.Router();

const allowedValuesToUpdate = ["name", "email", "city"];

// Create new member
router.post('/members', async (req, res) => {
    const isValidReq = isValidRequest(req.body, allowedValuesToUpdate);
    if(!isValidReq){
        return res.status(400).json(buildResponse('request has invalid values to update', undefined));
    }
 
    try{
        const newMember = await membersController.addMember(req.body);
        
        if(!newMember){
            return res.status(500).json(buildResponse(`Error creating member (memberData=${req.body})`, undefined));
        }

        res.status(201).json(buildResponse(undefined, newMember));
    } catch(e){
        console.error(e);
        res.status(400).json(buildResponse(e, undefined));
    }
});

// Get ALL members
router.get('/members', async (req, res) => {
    try{
        const members = await membersController.getAllMembers();
        
        if(!members){
            return res.status(500).json(buildResponse(`Error retrieving members from DB`, undefined));
        }
        res.json(buildResponse(undefined, members));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Get single member (by ID)
router.get('/members/:id', async (req, res) => {
    try{
        const member = await membersController.getMember(req.params.id);

        if(!member){
            return res.status(404).json(buildResponse(`Member with ID=${req.params.id} not found`, undefined));
        }

        res.json(buildResponse(undefined, member));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Update a member (by ID)
router.patch('/members/:id', async (req, res) => {
    const isValidReq = isValidRequest(req.body, allowedValuesToUpdate);
    if(!isValidReq){
        return res.status(400).json(buildResponse('request has invalid values to update', undefined));
    }

    try{
        const updatedMember = await membersController.updateMember(req.params.id, req.body);

        if(!updatedMember){
            return res.status(404).json(buildResponse(`Member with ID=${req.params.id} can't be updated`, undefined));
        }

        res.json(buildResponse(undefined, updatedMember));

    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Delete a member (by ID)
router.delete('/members/:id', async (req, res) => {
    try{
        const deletedMember = await membersController.deleteMember(req.params.id);
 
         if(!deletedMember){
             return res.status(404).json(buildResponse(`Member with ID=${req.params.id} can't be deleted`, undefined));
         }
 
         res.json(buildResponse(undefined, deletedMember));
 
     } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
     }
});

// Delete all members
router.delete('/members/', async (req, res) => {
    try{
        await membersController.deleteAllMembers();
        res.json(buildResponse(undefined, 'Deleted all records from members collection'));
 
     } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
     }
});

module.exports = router;