const express = require('express');
const { buildResponse } = require('./common');
const showsController = require('../controllers/shows');

const router = express.Router();

/* Get all shows */
router.get('/shows', async (req, res) => {
    try{
        const shows = await showsController.getAllShows();
        console.log(shows[0]);
        res.json(buildResponse(undefined, shows));
    }catch(e){
        console.error(e);
        res.status(400).json(buildResponse(e, undefined));
    }
});

module.exports = router;