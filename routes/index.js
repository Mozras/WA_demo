var express = require('express');
var router = express.Router();

/* IMPORT CUSTOM MODULES */
const Count = require('../modules/count.js');
const counts = new Count();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Word counter' });

});

router.get('/new', async (req, res) => {
  const result = await counts.getData();
  res.render('new', {datas: result});

});

router.post('/new', async (req, res) => {
  await counts.getFreq(req.body);
  
});

module.exports = router;
