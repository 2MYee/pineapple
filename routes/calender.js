var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//Scehdule insert (open - public or private / share - single or share)
var inputSchedule = (title, contents, author, open, share)=>{
    
}

//regist schedule
router.post('/', (req, res) => {
    
});

//modify schedule

//get schedule

//logout button
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.clearCookie('sid');

    res.render('index');
})


module.exports = router;