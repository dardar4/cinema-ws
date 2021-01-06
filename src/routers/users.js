const express = require('express');
const userController = require('../controllers/users')

const router = express.Router();

const buildResponse = (error, result) => {
    return {
        error,
        result
    }
}

/* Get all users */
router.get('/api/users', async (req, res) => {
    try{
        const users = await userController.getAllUsers();
        res.json(buildResponse(undefined, users));
    }catch(e){
        console.error(e);
        res.status(400).json(buildResponse(e, undefined));
    }
});

/* Get a user by id */
router.get('/api/users/:id', async(req, res) => {
    try{
        const userId = parseInt(req.params.id);
        const user = await userController.getUser(userId);
        if(!user){
            const errMsg = `User with id=${userId} not found`;
            res.json(buildResponse(errMsg, undefined));
        }
        res.json(buildResponse(undefined, user));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

/* Create new user */
router.post('/api/users', async(req, res) => {
    try{
        const userData = req.body;
        const newUser = await userController.addUser(userData);

        if(!newUser){
            return res.json(buildResponse('error creating a new user', undefined));
        }
        res.json(buildResponse(undefined, newUser));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});
 
/* Update a user by id */
router.patch('/api/users/:id', async(req, res) => {
    try{
        const userId = parseInt(req.params.id);
        const userData = req.body;
        const updatedUser = await userController.updateUser(userId, userData);

        if(!updatedUser){
            return res.json(buildResponse(`error updating user id=${userData.id}`, undefined));
        }
        res.json(buildResponse(undefined, updatedUser));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

/* Delete a user by id */
router.delete('/api/users/:id', async(req, res) => {
    try{
        const userId = parseInt(req.params.id);
        const deletedUser = await userController.deleteUser(userId);

        if(!deletedUser){
            return res.json(buildResponse(`error deleting user id=${userId}`, undefined));
        }
        res.json(buildResponse(undefined, deletedUser));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

/* Delete all users */
router.delete('/api/users', async(req, res) => {
    try{
        await userController.deleteAllUsers();
        res.json(buildResponse(undefined, []));
    }catch(e){
        console.error(e);
        res.status(500).json(buildResponse(e, undefined));
    }
});

module.exports = router;



