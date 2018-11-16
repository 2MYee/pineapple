var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//  get user password encrypting salt
var getSalt = function (name, callback) {
    var query = 'SELECT salt FROM user_info WHERE name=\'' + name + '\';';
    connection.query(query, function (err, row) {
        if (err) throw err;

        callback(null, row[0].id);
    });
}

//  compare user's input & database
var isUserCorrect = function(name, password){
    
    return false;
}

//  get user's information for login by POST method
router.post('/', function(req, res){
    var name = req.body.name;
    console.log(name);
    
    if(false){
        res.render('main');
    }else{
        //alter message : Front-end
    }
});


module.exports = router;