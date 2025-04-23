// const express = require('express');
// const router = express.Router();
// const Shop = require('../models/Shop');

// // Order page route - Fetch shop info from the database based on shopName and contact
// router.get('/order-:shopName&:contact', async (req, res) => {
//   const shopName = decodeURIComponent(req.params.shopName);
//   const contact = req.params.contact;

//   try {
//     // Find shop from the database using both shopName and contact
//     const shop = await Shop.findOne({ shopName, contact });

//     if (!shop) {
//       return res.status(404).send('Shop not found');
//     }

//     // Render order page with shop info
//     res.render('orderPage', { shopName: shop.shopName, contact: shop.contact, shopDetails: shop });
//   } catch (error) {
//     console.error('Error fetching shop info:', error);
//     res.status(500).send('Server error');
//   }
// });



// // const Shop = require('./models/Shop'); // Add this if not already

// router.get('/order-:shopName&:contact', async (req, res) => {
//   const shopName = decodeURIComponent(req.params.shopName);
//   const contact = req.params.contact;

//   try {
//     const shop = await Shop.findOne({ shopName, contact });

//     if (!shop) {
//       return res.status(404).send("Shop not found");
//     }

//     res.render('orderPage', { shopDetails: shop }); // ✅ Pass shopDetails to EJS
//   } catch (err) {
//     console.error("Error fetching shop:", err);
//     res.status(500).send("Server error");
//   }
// });

// router.post('/confirm-order', async (req, res) => {
//   try {
//     const { shopName, contact, location, address, items } = req.body;
//     const salesmanName = req.session.salesman?.name || "Unknown"; // ✅ Get Salesman Name

//     const newOrder = new Order({
//       shopName,
//       contact,
//       location,
//       address,
//       items,
//       salesman: salesmanName // ✅ Store Salesman Name in the Order
//     });

//     await newOrder.save();
//     res.json({ message: "Order placed successfully!" });
//   } catch (error) {
//     console.error("Order placement error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Shop = require('../models/Shop');
// const Order = require('../models/order');  // Assuming you have an Order model to save orders

// // Order page route - Fetch shop info from the database based on shopName and contact
// router.get('/order-:shopName&:contact', async (req, res) => {
//   const shopName = decodeURIComponent(req.params.shopName);
//   const contact = req.params.contact;

//   try {
//     // Find shop from the database using both shopName and contact
//     const shop = await Shop.findOne({ shopName, contact });

//     if (!shop) {
//       return res.status(404).send('Shop not found');
//     }

//     // Render order page with shop info
//     res.render('orderPage', { shopDetails: shop });
//   } catch (error) {
//     console.error('Error fetching shop info:', error);
//     res.status(500).send('Server error');
//   }
// });

// // Confirm order - Save order to MongoDB
// router.post('/confirm-order', async (req, res) => {
//   const { 
//     userName, 
//     userContact, 
//     shopName, 
//     shopContact, 
//     orderDate, 
//     totalPrice, 
//     orderItems 
//   } = req.body;

//   try {
//     const newOrder = new Order({
//       customerName: userName,
//       contact: userContact,
//       orderDate: new Date(orderDate),
//       shopDetails: {
//         shopName,
//         contact: shopContact
//       },
//       products: JSON.parse(orderItems),
//       totalPrice,
//       userName,
//       userContact
//     });

//     await newOrder.save();
//     res.json({ message: 'Order placed successfully!' });

//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }

// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const Order = require('../models/order');

// GET route for order page with shop details
router.get('/order-:shopName&:contact', async (req, res) => {
  const shopName = decodeURIComponent(req.params.shopName);
  const contact = req.params.contact;

  try {
    const shop = await Shop.findOne({ shopName, contact });

    if (!shop) {
      return res.status(404).send('Shop not found');
    }

    res.render('orderPage', { shopDetails: shop });
  } catch (error) {
    console.error('Error fetching shop info:', error);
    res.status(500).send('Server error');
  }
});

// POST route for confirming and saving the order
router.post('/confirm-order', async (req, res) => {
  try {
    const {
      userName,
      userContact,
      shopName,
      shopContact,
      orderDate,
      totalPrice,
      orderItems
    } = req.body;

    if (!userName || !userContact || !shopName || !shopContact || !orderItems) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let parsedItems;
    try {
      parsedItems = typeof orderItems === 'string' ? JSON.parse(orderItems) : orderItems;
    } catch (parseError) {
      return res.status(400).json({ message: 'Invalid orderItems format' });
    }

    const newOrder = new Order({
      customerName: userName,
      contact: userContact,
      orderDate: new Date(orderDate || Date.now()),
      shopDetails: {
        shopName,
        contact: shopContact
      },
      products: parsedItems,
      totalPrice,
      userName,
      userContact
    });

    await newOrder.save();

    // Send a success response
    res.json({ message: 'Order placed successfully!' });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
