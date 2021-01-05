const express = require('express');
const loginController = require('../controllers/login')

const router = express.Router();

const buildResponse = (error, result) => {
    return {
        error,
        result
    }
}

/* Get a user by id */
router.post('/api/login/', async(req, res) => {
    try{
        const userName = req.body.userName;
        const password = req.body.password;

        const userLoginData = await loginController.checkLogin(userName, password);

        if(!userLoginData){
            const errMsg = 'User name or password is incorrect';
            res.json(buildResponse(errMsg, undefined));
        }
        res.json(buildResponse(undefined, userLoginData));
    }catch(e){
        res.status(500).json(buildResponse(e, undefined));
    }
});



module.exports = router;



