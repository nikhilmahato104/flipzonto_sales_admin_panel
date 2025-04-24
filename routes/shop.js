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






//frontend new react sales panel for fetch all shop
// New API route to get shops as JSON (not rendered view)
// New API route to get shops as JSON
// Remove the ensureAuth middleware to make this route public
router.get('/api/shops/:region', async (req, res) => {
  const region = req.params.region;

  if (!regions.includes(region)) {
    return res.status(400).json({ error: 'Invalid region' });
  }

  try {
    const shops = await Shop.find({ region });
    res.json({ shops });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});





module.exports = router;