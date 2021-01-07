const express = require('express');
const { buildResponse } = require('./common');
const showsController = require('../controllers/shows');

const router = express.Router();

/* Get all shows */
router.get('/shows', async (req, res) => {
    try{
        const shows = await showsController.getAllShows();
        res.json(buildResponse(undefined, shows));
    }catch(e){
        console.error(e);
        res.status(400).json(buildResponse(e, undefined));
    }
});

/* Create new show */
router.post('/shows', async(req, res) => {
    try{
        const showData = req.body;
        const newShow = await showsController.addShow(showData);
        if(!newShow){
            return res.json(buildResponse('error creating a new show', undefined));
        }
        res.json(buildResponse(undefined, newShow));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

module.exports = router;