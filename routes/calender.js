var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//Scehdule insert (open - public or private / share - single or share)
var inputSchedule = (title, contents, author)=>{
    var query = "INSERT INTO " // ~~~
}

//regist schedule
router.post('/', (req, res) => {
    var schedule = {
        id : req.body.schedule_id,
        title : req.body.title,
        author : req.session.user_name,
        contents : req.body.contents,
        date_start : req.body.date_start,
        date_end : req.body.date_end
    }
    
});


//logout button
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.clearCookie('sid');

    res.render('index');
})


module.exports = router;