var express = require('express');
var mysql = require('mysql');
var crypto = require('crypto');
var dbconfig = require('../config/dbconfig');

var connection = mysql.createConnection(dbconfig);

connection.connect();

var router = express.Router();

//  get user password encrypting salt
var getSalt = function (name) {
    var query = 'SELECT salt FROM user_info WHERE name=\'' + name + '\';';
    console.log(query)
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, row) {
            if (err) throw err;
            console.log(row[0]);
            if (row[0] == undefined) {
                console.log('salt : NaN');
                resolve(NaN);
            } else {
                console.log('salt : ' + row[0].salt);
                resolve(row[0].salt);
            }
        })
    })
}

//  compare user's input & database
var isUserCorrect = function (name, password) {
    return new Promise((resolve, reject)=>{
        getSalt(name).then((result)=>{
            if(result == NaN) resolve(false);
            console.log(result);
            crypto.pbkdf2(password, result.toString(), 143752, 32, 'sha512', function(err, key){
                var query = 'SELECT id FROM user_info WHERE password=\'' + key.toString('base64') + '\';';
                console.log(query);
                connection.query(query, (err,row)=>{
                    if(err) throw err;
                    if(row[0] == undefined){
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                })
            });
        })
    })
}


// name, pw post -> get salt (Y/N) -> N = null return | Y = pw crypto result return

//  get user's information for login by POST method
router.post('/', function (req, res) {
    var name = req.body.name;
    console.log(name);

    isUserCorrect(name, req.body.password).then((result) => {
        if(result){
            console.log('login success');
            res.render('main');
        }else{
            console.log('login fail');
            res.render('fail');
        }
    })
});


module.exports = router;