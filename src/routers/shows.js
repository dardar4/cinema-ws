const express = require('express');
const showController = require('../controllers/shows');
const { isValidRequest, buildResponse } = require('./common');

const router = new express.Router();

const allowedValuesToUpdate = ["name", "showID", "imageURL", "premiered", "genres", "subscribers"];

// Create new show
router.post('/shows', async (req, res) => {
    const isValidReq = isValidRequest(req.body, allowedValuesToUpdate);
    if(!isValidReq){
        return res.status(400).json(buildResponse('request has invalid values to update', undefined));
    }

    try{
        const newShow = await showController.addShow(req.body);
        
        if(!newShow){
            return res.status(500).json(buildResponse(`Problem when saving show='${showToAdd.name}' (showID=${showToAdd.showID})`, undefined));
        }

        res.status(201).json(buildResponse(undefined, newShow));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Get ALL show
router.get('/shows', async (req, res) => {
    try{
        const shows = await showController.getAllShows();

        if(!shows){
            return res.status(500).json(buildResponse(`Error retrieving shows from DB`, undefined));
        }

        res.json(buildResponse(undefined, shows));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Get single show (by ID)
router.get('/shows/:id', async (req, res) => {
    try{
        const show = await showController.getShow(req.params.id);

        if(!show){
            return res.status(404).json(buildResponse(`Show with ID=${req.params.id} not found`, undefined));
        }

        res.json(buildResponse(undefined, show));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Update shows (by ID)
router.patch('/shows/:id', async (req, res) => {
    const isValidReq = isValidRequest(req.body, allowedValuesToUpdate);
    if(!isValidReq){
        return res.status(400).json(buildResponse('request has invalid values to update', undefined));
    }

    try{
        const updatedShow = await showController.updateShow(req.params.id, req.body);

        if(!updatedShow){
            return res.status(404).json(buildResponse(`Show with showID=${req.params.id} can't be updated`, undefined));
        }

        res.json(buildResponse(undefined, updatedShow));

    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Delete a show (by ID)
router.delete('/shows/:id', async (req, res) => {
    try{
        const deletedShow = await showController.deleteShow(req.params.id);
 
         if(!deletedShow){
             return res.status(404).json(buildResponse(`Show with ID=${req.params.id} can't be deleted`, undefined));
         }
 
         res.json(buildResponse(undefined, deletedShow));
 
     } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
     }
});

// Delete all shows
router.delete('/shows/', async (req, res) => {
    try{
        await showController.deleteAllShows();
        res.json(buildResponse(undefined, 'Deleted all records from shows collection'));
     } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
     }
});

module.exports = router;