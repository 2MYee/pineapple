var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);
var router = express.Router();

connection.connect();

var outer = function (v) {

    return v;
}

var getId = function (name, callback) {
    var query = 'SELECT id FROM user_info WHERE name=\'' + name + '\';';
    connection.query(query, function (err, row) {
        if (err) throw err;

        callback(null, row[0].id);
    });
}

var inputUser = function (name, pw, nickname) {
    var query = 'INSERT INTO user_info (name, password) VALUES (\'' + name + '\',\'' + pw + '\');';
    connection.query(query, function (err) {
        if (err) throw err;
    });
    getId(name, function (err, id) {
        var query = 'INSERT INTO user_subinfo (id, nickname, icon) VALUES (' + id + ',\'' + nickname + '\',\'null\');';
        connection.query(query, function(err){
            if(err) throw err;
        })
    });
}

router.post('/', function (req, res) {
    var name = req.body.name;
    var pw = req.body.password;
    var nick = req.body.nickname;
    inputUser(name,pw,nick);

    res.send('<h1>' + name + ', ' + pw + ', ' + nick + '</h1>');
});

module.exports = router;


/*
getdata -> cryption -> input(info, name&salt)
select(getId) -> input(subinfo, nickname)


*/