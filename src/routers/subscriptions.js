const express = require('express');
const { isValidRequest, buildResponse } = require('./common');
const subscriptionsController = require('../controllers/subscriptions');

const router = new express.Router();

const allowedValuesToUpdate = ["memberID", "shows"];

// Create new subscription
router.post('/subscriptions', async (req, res) => {
    const isValidReq = isValidRequest(req.body, allowedValuesToUpdate);
    if(!isValidReq){
        return res.status(400).json(buildResponse('request has invalid values to update', undefined));
    }

    try{
        const newSubscription = await subscriptionsController.addSubscription(req.body);

        if(!newSubscription){
            return res.status(500).json(buildResponse(`Problem when saving subscription with id=${req.body.memberID}`, undefined));
        }

        res.status(201).json(buildResponse(undefined, newSubscription));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Get ALL subscriptions
router.get('/subscriptions', async (req, res) => {
    try{
        const subscriptions = await subscriptionsController.getAllSubscriptions();
        res.json(buildResponse(undefined, subscriptions));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Get single subscription (by ID)
router.get('/subscriptions/:id', async (req, res) => {
    try{
        const subscription = await subscriptionsController.getSubscription(req.params.id);

        if(!subscription){
            return res.status(404).json(buildResponse(`Subscription with ID=${req.params.id} not found`, undefined));
        }

        res.json(buildResponse(undefined, subscription));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Update a subscription (by ID)
router.patch('/subscriptions/:id', async (req, res) => {
    const isValidReq = isValidRequest(req.body, allowedValuesToUpdate);
    if(!isValidReq){
        return res.status(400).json(buildResponse('request has invalid values to update', undefined));
    }

    try{
        const updatedSubscription = await subscriptionsController.updateSubscription(req.params.id, req.body);

        if(!updatedSubscription){
            return res.status(404).json(buildResponse(`Subscription with ID=${req.params.id} can't be updated`, undefined));
        }

        res.json(buildResponse(undefined, updatedSubscription));
    } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

// Delete a subscription (by ID)
router.delete('/subscriptions/:id', async (req, res) => {
    try{
        const deletedSubscription = await subscriptionsController.deleteSubscription(req.params.id);
 
         if(!deletedSubscription){
             return res.status(404).json(buildResponse(`Subscription with ID=${req.params.id} can't be deleted`, undefined));
         }
 
         res.json(buildResponse(undefined, deletedSubscription));
     } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
     }
});

// Delete all subscriptions
router.delete('/subscriptions/', async (req, res) => {
    try{
        await subscriptionsController.deleteAllSubscriptions();
        res.json(buildResponse(undefined, 'Deleted all records from subscriptions collection'));
     } catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
     }
});

module.exports = router;