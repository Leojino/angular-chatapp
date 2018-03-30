var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendfile(__dirname + '/index.html');
});


// router.get('/api/chat', function(req, res){
//   res.json({
//     "msg": "chat received"
//   })
// });

module.exports = router;
