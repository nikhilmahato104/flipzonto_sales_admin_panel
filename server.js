
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
// const cartRoutes = require('./routes/cart');

// const app = express();

// // Middleware should be defined before routes
// app.use(express.json());  // Handles JSON payloads
// app.use(express.urlencoded({ extended: true }));  // Handles form submissions (application/x-www-form-urlencoded)
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Session configuration
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
// }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// // Routes
// app.use('/', authRoutes);
// app.use('/', shopRoutes);
// app.use('/', orderRoutes);  // Routes for orders
// app.use('/', cartRoutes);


// const cors = require('cors');

// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://127.0.0.1:5173',
//   'https://your-production-domain.com',
//   'http://localhost:5173/shops/north-mon',
//   'http://localhost:5173',
//   'http://localhost:3000',
//   'http://localhost:3001'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));





// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');

const app = express();

// --- ✅ CORS Middleware (Placed BEFORE routes/middleware)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://your-production-domain.com',
  'https://sales-manpanel-react-darkhower.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// --- ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- ✅ Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// --- ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// --- ✅ Routes
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', orderRoutes);
app.use('/', cartRoutes);

// --- ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
