const express = require('express');
const router = express.Router();
let forumsArr = [
  {
    title: 'Beauty of ancient Life',
    date: '2010-12-09',
    body: 'Acoording to the author the life of ancient time is beautiful ,this forum is all about it',
    author: 'ferandos',
  },
];
router.get('/', function (req, res) {
  res.json(forumsArr);
});
router.post('/', function (req, res) {
  forumsArr.push(req.body);
  res.send({ status: 'Successfully added the product' });
});
router.delete('/:index', function (req, res) {
  let newforumsArr = forumsArr.filter((value, index) => {
    if (index === parseInt(req.params.index)) {
      return false;
    } else {
      return true;
    }
  });
  forumsArr = newforumsArr;
  res.send({ status: 'Forum deleted Successfully' });
});
router.get('/clearAll', function (req, res) {
  forumsArr = [];
  res.send({ status: 'Cleared all forums' });
});
module.exports = router;
