var express = require('express');
var dbconfig = require('../config/dbconfig');
var mysql = require('mysql');

var connection = mysql.createConnection(dbconfig);

var router = express.Router();

const getBoard = ()=>{
  return new Promise((resolve, reject)=>{
    const query = 'SELECT * FROM board';
    connection.query(query, (err, rows)=>{
      if(err) throw err;
      resolve(rows);
    })
  })
}

router.get('/', (req,res)=>{
  if(req.session.user_name == undefined){
    console.log('LOG : no user login');
    res.render('index');
  }else{
    console.log('LOG : user already login : ' + req.session.user_name);
    res.render('board', {user_name : req.session.user_name});
  }
});

router.post('/', (req, res)=>{
  getBoard().then((result)=>{
    res.json(result);
  })
})

const registBoard = (title, content)=>{
  const query = 'INSERT INTO board SET ?';
  const date = 'now()';
  const param = [title, date, content];
  connection.query(query, param,(err)=>{
      if(err) throw err;
  })
}

router.post('/getUsername', (req,res)=>{
  res.json(req.session.user_name);
})

router.post('/regist', (req, res)=>{
  registBoard(req.body.title, req.body.content);
})

//when called press F5
router.get('/', (req, res) => {
  res.render('board');
})

module.exports = router;
