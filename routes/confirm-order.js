// const express = require('express');
// const router = express.Router();
// const Order = require('../models/order');  // Assuming your Order model is already set up
// const Shop = require('../models/Shop');    // Assuming your Shop model is set up

// // POST route to handle order confirmation
// router.post('/confirm-order', async (req, res) => {
//   const { 
//     userName, 
//     userContact, 
//     shopName, 
//     shopContact, 
//     shopLocation, 
//     shopAddress, 
//     orderDate, 
//     totalPrice, 
//     orderItems 
//   } = req.body;

//   try {
//     // Create a new order
//     const newOrder = new Order({
//       customerName: userName,  // User's name
//       contact: userContact,    // User's contact
//       orderDate: new Date(orderDate),  // Order date
//       shopDetails: {
//         shopName,              // Shop's name
//         contact: shopContact,  // Shop's contact
//         location: shopLocation, // Shop's location
//         address: shopAddress   // Shop's address
//       },
//       products: JSON.parse(orderItems),  // Parsing the order items array from the frontend
//       totalPrice,                     // Total price of the order
//       userName,                        // User's name
//       userContact                      // User's contact
//     });

//     // Save the order to the database
//     await newOrder.save();

//     // Send a success response
//     res.json({ message: 'Order placed successfully!' });

//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;






const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Your Mongoose model
const Shop = require('../models/Shop');    // In case you want to reference it later

// Middleware to parse JSON
router.use(express.json());

router.post('/confirm-order', async (req, res) => {
  try {
    const { 
      userName, 
      userContact, 
      shopName, 
      shopContact, 
      shopLocation, 
      shopAddress, 
      orderDate, 
      totalPrice, 
      orderItems 
    } = req.body;

    const newOrder = new Order({
      customerName: userName,
      userName,
      userContact,
      contact: userContact,
      orderDate: new Date(orderDate),
      shopDetails: {
        shopName,
        contact: shopContact,
        location: shopLocation,
        address: shopAddress
      },
      products: JSON.parse(orderItems),
      totalPrice
    });

    await newOrder.save();

    res.status(200).json({ message: 'Order placed successfully!' });

  } catch (error) {
    console.error('❌ Error saving order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
