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
    var query = 'SELECT id FROM user_info WHERE name=?';
    var param = [name];
    connection.query(query, param, function (err, row) {
        if (err) throw err;
        callback(null, row[0].id);
    });
}

/*  insert user information in user_info and user_subinfo
    insert user_info -> get user id -> insert user_subinfo
*/
var inputUser = function (name, pw, salt, nickname) {
    var query = 'INSERT INTO user_info (name, password, salt) VALUES (?, ?, ?)';
    var params = [name, pw, salt];
    console.log(query);
    connection.query(query, params, function (err) {
        if (err) throw err;
    });
    getId(name, function (err, id) {
        if (err) throw err;
        var query = 'INSERT INTO user_subinfo (id, nickname, icon) VALUES (?, ?, \'null\');';
        var params = [id, nickname];
        connection.query(query, params, function (err) {
            if (err) throw err;
        })
    });
}

/*
    check user name is already exist when signup
    return true when user name cannot using
    return false when user name can use (not exist)
*/
var existCheck = function (name) {
    return new Promise((resolve, reject) => {
        var query = 'SELECT name FROM user_info WHERE name=?';
        var param = [name];
        connection.query(query, param, (err, row) => {
            if (err) throw err;
            if (row[0] == undefined) resolve(true)
            else resolve(false)
        })
    })
}

/*
    Click '중복확인' button -> cheking user name can use
*/
router.post('/check', (req, res) => {
    existCheck(req.body.name).then((result) => {
        var response = {
            result: true
        }
        if (result) { //true
            response['create'] = false;
        } else {
            response['create'] = true;
        }
        res.json(response);
    })
})

//  get user's signup information by POST method and encrypting password and insert into database
router.post('/', function (req, res) {
    var name = req.body.name;
    var nickname = req.body.nickname;
    var salt = crypto.randomBytes(32);
    crypto.pbkdf2(req.body.password, salt.toString('base64'), 143752, 32, 'sha512', function (err, key) {
        if (err) throw err;
        inputUser(name, key.toString('base64'), salt.toString('base64'), nickname);
        console.log(salt.toString('base64'));
        console.log(key.toString('base64'));
    })


    res.send('<h1>' + name + ', ' + nickname + '</h1>');
});

router.get('/', (req, res) => {
    res.render('signUp');
})

module.exports = router;