var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);
var router = express.Router();

connection.connect();

/*  Get user id from user_info table cause connecting user_subinfo's id
*/
var getId = function (name, callback) {
    var query = 'SELECT id FROM user_info WHERE name=\'' + name + '\';';
    connection.query(query, function (err, row) {
        if (err) throw err;
        callback(null, row[0].id);
    });
}

/*  insert user information in user_info and user_subinfo
    insert user_info -> get user id -> insert user_subinfo
*/
var inputUser = function (name, pw, salt, nickname) {
    var query = 'INSERT INTO user_info (name, password, salt) VALUES (\'' + name + '\',\'' + pw +'\',\'' + salt + '\');';
    console.log(query);
    connection.query(query, function (err) {
        if (err) throw err;
    });
    getId(name, function (err, id) {
        if (err) throw err;
        var query = 'INSERT INTO user_subinfo (id, nickname, icon) VALUES (' + id + ',\'' + nickname + '\',\'null\');';
        connection.query(query, function(err){
            if(err) throw err;
        })
    });
}

var existCheck = function(name){
    
}

//  get user's signup information by POST method and encrypting password and insert into database
router.post('/', function (req, res) {
    var name = req.body.name;
    var nickname = req.body.nickname;
    var salt = crypto.randomBytes(32);
    crypto.pbkdf2(req.body.password, salt.toString('base64'), 143752, 32, 'sha512', function(err, key){
        if(err) throw err;
        inputUser(name,key.toString('base64'), salt.toString('base64'),nickname);
        console.log(salt.toString('base64'));
        console.log(key.toString('base64'));
    })


    res.send('<h1>' + name + ', ' + nickname + '</h1>');
});

router.get('/', (req,res) => {
    res.render('signUp');
})

module.exports = router;


/*
getdata -> cryption -> input(info, name&salt)
select(getId) -> input(subinfo, nickname)


*/