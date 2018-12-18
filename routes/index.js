var express = require('express');
var xml2js = require('xml2js');
var request = require('request');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);
connection.connect();

/* 
  GET home page. 
  login check (not login / already login)
*/
router.get('/', function(req, res, next) {
  if(req.session.user_name == undefined){
    console.log('LOG : no user login');
    res.render('index');
  }else{
    console.log('LOG : user already login : ' + req.session.user_name);
    res.render('calendor', {user_name : req.session.user_name});
  }
});

router.post('/testtt', function(req, res){
  console.log("ajax test");
  var resData = req.body.msg
  console.log(resData)
  var responseData = {
    result : true 
  }
  responseData['msg'] = resData;
  res.json(responseData);
})

router.post('/test', (req, res)=>{
  var url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=2018&solMonth=05&ServiceKey=n3ZXMtMlodEBPY8IeuelMTZp%2FcgX6pCpXY%2Bi7VTS%2FHTgUO7quObnSu8RxAP9NbCiieqGcNd17bkrSTcvSuAbKA%3D%3D';
  var parse = new xml2js.Parser();
  request({
    url: url,
    method: 'GET'
  }, (error, response, body)=>{
    parse.parseString(body, (err, result)=>{
      console.log(result['response']['body'][0]['items'][0]['item'].length)
      var ar = result['response']['body'][0]['items'][0]['item']
      console.log(ar.length)
      console.log(ar[0]['dateName'])
      res.json(ar)
    })
  })
})

router.post('/asdf', (req,res)=>{
  var query = 'INSERT INTO user_info SET ?'
  var id = 13;
  var data = {
    name : '89999',
    password : '1234',
    salt : '12345'
  }
  var params = [data,id];
  var insert = connection.query(query, params, (err, result)=>{
    if (err) throw err;
    console.log(result);
  })
  console.log(insert.sql);
})

module.exports = router;
