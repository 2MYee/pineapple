var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', function(req, res){
  console.log("ajax test");
  var responseData = {'result' : 'ok', 'email' : "asdfb"}
  res.json(responseData);
  // 서버에서는 JSON.stringify 필요없음
})

module.exports = router;
