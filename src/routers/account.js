const express = require('express');
const accountController = require('../controllers/account')

const router = express.Router();

const buildResponse = (error, result) => {
    return {
        error,
        result
    }
}

/* Get a user by id */
router.post('/api/account/login', async(req, res) => {
    try{
        const userName = req.body.userName;
        const password = req.body.password;

        const userLoginData = await accountController.checkLogin(userName, password);

        if(!userLoginData){
            const errMsg = 'User name or password is incorrect';
            res.json(buildResponse(errMsg, undefined));
        }
        res.json(buildResponse(undefined, userLoginData));
    }catch(e){
        res.status(500).json(buildResponse(e, undefined));
    }
});

router.post('/api/account/create', async(req, res) => {
    try{
        const userName = req.body.userName;
        const newPassword = req.body.newPassword;

        const userLoginData = await accountController.createAccount(userName, newPassword);

        if(!userLoginData){
            const errMsg = 'Error creating account';
            res.json(buildResponse(errMsg, undefined));
        }
        res.json(buildResponse(undefined, userLoginData));
    }catch(e){
        res.status(500).json(buildResponse(e, undefined));
    }
});



module.exports = router;



