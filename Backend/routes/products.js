const express = require('express');
const router = express.Router();
let productsArr = [
  {
    name: 'womens watch',
    price: '2999',
    description: 'water proof and guaranteed 5 years ',
    category: 'womens',
    status: 'available',
  },
];
router.get('/', function (req, res) {
  res.json(productsArr);
});
router.post('/', function (req, res) {
  productsArr.push(req.body);
  res.send({ status: 'Product added Successfully' });
});
router.delete('/:index', function (req, res) {
  let newProductsArr = productsArr.filter((val, index) => {
    if (index === parseInt(req.params.index)) {
      return false;
    } else {
      return true;
    }
  });
  productsArr = newProductsArr;
  res.send({ status: 'Product deleted Successfully' });
});
router.get('/clearAll', function (req, res) {
  productsArr = [];
  res.send({ status: 'Deleted all products' });
});
module.exports = router;
