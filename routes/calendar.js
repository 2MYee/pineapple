var express = require('express');
var mysql = require('mysql');
var xml2js = require('xml2js');
var request = require('request');
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
    console.log('get ??')
    return new Promise((resolve, reject)=>{
        console.log('get ??')
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
        id : -1,
        authorId : req.session.user_id, // default = -1
        date_start : req.body.date,
        // date_end : req.body.date_end,
        title : req.body.title,
        content : req.body.content,
        style : req.body.style
    }
    getUserId(req.session.user_name).then((result)=>{
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
const parseNumber = (number)=>{
    if(parseInt(number)>=10){
        return number;
    }else{
        return '0'+ parseInt(number);
    }
}

const deleteSchedule = (id)=>{
    return new Promise((resolve, reject)=>{
        const query = 'DELETE FROM schedule WHERE id=?';
        connection.query(query, id, (err, row)=>{
            if(err) throw err
            resolve(true)
        })
    })
}

router.post('/delete', (req,res)=>{
    const scheduleId = req.body.id;
    deleteSchedule(scheduleId).then((result)=>{
        console.log('delete')
    })
})

var getSchedule = (id, year, month)=>{
    return new Promise((resolve, reject) =>{
        var query = 'SELECT * FROM schedule WHERE authorId=? && year(date_start)=? && month(date_start)=?'
        var param = [id, year, parseNumber(month)];
        connection.query(query, param, (err, rows)=>{
            if(err) throw err;
            resolve(rows)
        })
    })
}

router.post('/getschedule', (req,res)=>{
    getSchedule(req.session.user_id, req.body.year, req.body.month).then((result)=>{
        res.json(result)
    })
})

router.post('/getHoliday', (req,res)=>{
    try {
        var year = req.body.year;
        var month = req.body.month;
        var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear='+year+'&solMonth='+month+'&ServiceKey=n3ZXMtMlodEBPY8IeuelMTZp%2FcgX6pCpXY%2Bi7VTS%2FHTgUO7quObnSu8RxAP9NbCiieqGcNd17bkrSTcvSuAbKA%3D%3D';
        console.log(url);
        var parse = new xml2js.Parser();
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            parse.parseString(body, (err, result) => {
                if(err) console.log(err)
                // console.log(result['response']['body'][0]['items'][0]['item'].length)
                var ar = result['response']['body'][0]['items'][0]['item']
                // console.log(ar.length)
                // console.log(ar[0]['dateName'])
                res.json(ar)
            })
        })
    } catch (error) {
        console.log(error)
    }
})

const outSchedule = (title, content)=>{
    const query = 'INSERT INTO board SET ?';
    const date = 'now()';
    const param = [title, date, content];
    connection.query(query, param,(err)=>{
        if(err) throw err;
    })
}

router.post('/out', (req, res)=>{
    outSchedule(req.body.title, req.body.connect);
})

router.get('/', (req,res)=>{
  if(req.session.user_name == undefined){
    console.log('LOG : no user login');
    res.render('index');
  }else{
    console.log('LOG : user already login : ' + req.session.user_name);
    res.render('calendar', {user_name : req.session.user_name});
  }
})

router.post('/getUsername', (req,res)=>{
    res.json(req.session.user_name);
})

//logout button
router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.clearCookie('sid');

    res.render('index');
})


module.exports = router;