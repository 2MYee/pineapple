var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//Scehdule insert (open - public or private / share - single or share)
var inputSchedule = (title, contents, author)=>{
    return new Promise((resolve, reject)=>{
        var query = "INSERT INTO " // ~~~
    })
}

//regist schedule
router.post('/', (req, res) => {
    var schedule = {
        
    }
});


//logout button
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.clearCookie('sid');

    res.render('index');
})


module.exports = router;