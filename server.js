const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/', authRoutes);
app.use('/', shopRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

// Example route in app.js or a router file
const Shop = require('./models/Shop'); // Add this if not already

app.get('/order-:shopName&:contact', async (req, res) => {
  const shopName = decodeURIComponent(req.params.shopName);
  const contact = req.params.contact;

  try {
    const shop = await Shop.findOne({ shopName, contact });

    if (!shop) {
      return res.status(404).send("Shop not found");
    }

    res.render('orderPage', { shopDetails: shop }); // ✅ Pass shopDetails to EJS
  } catch (err) {
    console.error("Error fetching shop:", err);
    res.status(500).send("Server error");
  }
});



app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
