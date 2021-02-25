const express = require('express');
const { buildResponse } = require('./common');
const subscriptionsController = require('../controllers/subscriptions');

const router = express.Router();


router.get('/subscriptions', async(req, res) => {
    try{
        const subscriptions = await subscriptionsController.getSubscriptions();
        res.json(buildResponse(undefined, subscriptions));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
})

/* Subscribe shows to member */
router.post('/subscriptions', async(req, res) => {
    try{
        const subscribeShowData = req.body;
        const newShowSubscription = await subscriptionsController.createShowSubscription(subscribeShowData);
        
        if(!newShowSubscription){
            return res.json(buildResponse('error creating a new show subscription', undefined));
        }
        res.json(buildResponse(undefined, newShowSubscription));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

/* Subscribe shows to member */
router.patch('/subscriptions/:id', async(req, res) => {
    try{
        const memberID = req.params.id;
        const subscribeShowData = req.body;
        const updatedShowSubscription = await subscriptionsController.updateShowSubscription(memberID, subscribeShowData);
        
        if(!updatedShowSubscription){
            return res.json(buildResponse('error creating a new show subscription', undefined));
        }
        res.json(buildResponse(undefined, updatedShowSubscription));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});



module.exports = router;