const express = require('express');
const router = express.Router();
const getRequest = require('./get');
const postRequest = require('./post');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

getRequest(router);
postRequest(router);


module.exports = router;