const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// Order page route - Fetch shop info from the database based on shopName and contact
router.get('/order-:shopName&:contact', async (req, res) => {
  const shopName = decodeURIComponent(req.params.shopName);
  const contact = req.params.contact;

  try {
    // Find shop from the database using both shopName and contact
    const shop = await Shop.findOne({ shopName, contact });

    if (!shop) {
      return res.status(404).send('Shop not found');
    }

    // Render order page with shop info
    res.render('orderPage', { shopName: shop.shopName, contact: shop.contact, shopDetails: shop });
  } catch (error) {
    console.error('Error fetching shop info:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
