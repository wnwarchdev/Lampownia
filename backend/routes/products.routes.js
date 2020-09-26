const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    const result = await Product
      .find()
      .select('name image price');
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;