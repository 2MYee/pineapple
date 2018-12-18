var express = require('express');
var router = express.Router();

//when called press F5
router.get('/', (req, res) => {
  res.render('board');
})

module.exports = router;
