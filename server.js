// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const path = require('path');
// const dotenv = require('dotenv');

// dotenv.config();

// const authRoutes = require('./routes/auth');
// const shopRoutes = require('./routes/shop');
// const orderRoutes = require('./routes/order');


// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
// }));

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// app.use('/', authRoutes);
// app.use('/', shopRoutes);
// app.use('/',orderRoutes);
// app.use('/confirm-order', orderRoutes);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const cartRoutes = require('./routes/cart');
// app.use('/', cartRoutes);


// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
//   });




const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');

const app = express();

// Middleware should be defined before routes
app.use(express.json());  // Handles JSON payloads
app.use(express.urlencoded({ extended: true }));  // Handles form submissions (application/x-www-form-urlencoded)
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', orderRoutes);  // Routes for orders
app.use('/', cartRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
