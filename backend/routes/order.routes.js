const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');


router.post('/order', async (req, res) => {
  try {
    const result = new Order({
      productsInCart: req.body.productsInCart,
      order: req.body.order,
    });
    result.save();
    if(!result) res.status(404).json({ post: 'Empty' });
    else {res.json(result);}
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;