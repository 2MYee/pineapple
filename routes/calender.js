var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//Scehdule insert (open - public or private / share - single or share)
var inputSchedule = (title)=>{
    if(title.id == -1){ //new schedule
        return new Promise((resolve, reject)=>{
            var query = 'asdfsdaf';
            connection.query(query, (err, row)=>{

            })
            resolve(row[0].id) // return new (return id)
        })
    }else{ //modify schedule
        return new Promise((resolve, reject)=>{

            resolve(row[0].id) // return modify (return id)
        })
    }
}

//regist schedule
router.post('/', (req, res) => {
    var schedule = {
        id : req.body.id, // default = -1
        date_start : req.body.date_start,
        date_end : req.body.date_end,
        author : req.session.user_name,
        title : req.body.title,
        contents : req.body.contents,
        style : req.body.style
    }
    console.log('using dummy data')
    res.json(schedule);

    // inputSchedule(schedule).then((result)=>{
    //     var schedule = {
    //         id : req.body.id, // default = -1
    //         date_start : req.body.date_start,
    //         date_end : req.body.date_end,
    //         author : req.session.user_name,
    //         title : req.body.title,
    //         contents : req.body.contents,
    //         style : req.body.style
    //     }
    //     // schedule.id = result; 
    //     res.json(schedule);
    // })
});


//logout button
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.clearCookie('sid');

    res.render('index');
})


module.exports = router;