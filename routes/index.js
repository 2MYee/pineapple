var express = require('express');
var router = express.Router();

/* 
  GET home page. 
  login check (not login / already login)
*/
router.get('/', function(req, res, next) {
  if(req.session.user_name == undefined){
    console.log('LOG : no user login')
    res.render('index');
  }else{
    console.log('LOG : user already login : ' + req.session.user_name)
    res.render('calendor', {user_name : req.session.user_name});
  }
});

router.post('/test', function(req, res){
  console.log("ajax test");
  var resData = req.body.msg
  console.log(resData)
  var responseData = {
    result : true 
  }
  responseData['msg'] = resData;
  res.json(responseData);
  // 서버에서는 JSON.stringify 필요없음
})

module.exports = router;
