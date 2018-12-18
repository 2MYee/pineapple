var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//Scehdule insert
var inputSchedule = (title)=>{
    var id = title.id;
    if(title.id == -1){ //new schedule => INSERT
        var query = 'INSERT INTO schedule SET ?';
    }else{ //modify schedule => UPDATE
        var query = 'UPDATE schedule SET ? WHERE id=?';
    }
    delete title['id'];
    return new Promise((resolve, reject)=>{
        connection.query(query, [title, id], (err, result)=>{
            if(err) throw err;
            resolve(result.insertId);
        })
    })
}

var getUserId = (user_name)=>{
    return new Promise((resolve, reject)=>{
        var query = 'SELECT id FROM user_info WHERE name=?';
        var param = [user_name];
        connection.query(query, param, (err, row)=>{
            if(err) throw err;
            resolve(row[0].id);
        })
    })
}

//regist schedule
router.post('/', (req, res) => {
    var schedule = {
        id : req.body.id, // default = -1
        date_start : req.body.date_start,
        date_end : req.body.date_end,
        title : req.body.title,
        content : req.body.content,
        style : req.body.style
    }
    getUserId(req,session.user_name).then((result)=>{
        schedule['authorId'] = result;
    })

    inputSchedule(schedule).then((result)=>{
        schedule['id'] = result;
        res.json(schedule);
    })
    // console.log('using dummy data')
    // res.json(schedule);
});

//schedule loading (page loading, click other month -> both)
var getSchedule = (id, year, month)=>{
    return new Promise((resolve, reject) =>{
        
    })
}

router.post('/getschedule', (req,res)=>{
    
})

router.post('/getHoliday', (req,res)=>{
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log('xhr loaded');
    }
    xhr.open('GET', 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=2015&solMonth=05&ServiceKey=n3ZXMtMlodEBPY8IeuelMTZp%2FcgX6pCpXY%2Bi7VTS%2FHTgUO7quObnSu8RxAP9NbCiieqGcNd17bkrSTcvSuAbKA%3D%3D')
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            console.log(this.status)
            console.log(this.responseText)
        }
    }
})

//logout button
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.clearCookie('sid');

    res.render('index');
})


module.exports = router;