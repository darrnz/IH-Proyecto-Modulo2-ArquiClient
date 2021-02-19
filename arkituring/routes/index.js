const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
    if (req.session.currentArchitect) {
        res.render('index', {
            valueCookie:req.session.currentArchitect
        })
    } 

    if (req.session.currentClient) {
        res.render('index', {
           valueCookie:req.session.currentClient
        })
    } 
    
    res.render('index')
    
});

module.exports = router;
