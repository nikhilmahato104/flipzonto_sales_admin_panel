const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const ensureAuth = require('../middleware/authMiddleware');

const regions = ['north-mon','north-tue','east-wed','east-thu','south-fri', 'west-sat'];

// Show all shops by region
regions.forEach(region => {
  // View all shops
  router.get(`/${region}/shops`, ensureAuth, async (req, res) => {
    const shops = await Shop.find({ region });
    res.render(`${region}/all`, { shops, region });
  });

  // Add shop form
  router.get(`/${region}/shops/create`, ensureAuth, (req, res) => {
    res.render(`${region}/create`, { region });
  });

  // Create shop
  router.post(`/${region}/shops/create`, ensureAuth, async (req, res) => {
    const { shopName, shopOwnerName, contact, address, location, imageUrl } = req.body;
    await Shop.create({ shopName, shopOwnerName, contact, address, location, imageUrl, region });
    res.redirect(`/${region}/shops`);
  });

  // Edit shop form
  router.get(`/${region}/shops/edit/:id`, ensureAuth, async (req, res) => {
    const shop = await Shop.findById(req.params.id);
    res.render(`${region}/edit`, { shop, region });
  });

  // Update shop
  router.post(`/${region}/shops/edit/:id`, ensureAuth, async (req, res) => {
    const { shopName, shopOwnerName, contact, address, location, imageUrl } = req.body;
    await Shop.findByIdAndUpdate(req.params.id, {
      shopName,
      shopOwnerName,
      contact,
      address,
      location,
      imageUrl
    });
    res.redirect(`/${region}/shops`);
  });

  // Delete shop
  router.post(`/${region}/shops/delete/:id`, ensureAuth, async (req, res) => {
    await Shop.findByIdAndDelete(req.params.id);
    res.redirect(`/${region}/shops`);
  });
});

module.exports = router;
