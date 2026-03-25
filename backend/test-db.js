const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI not found in .env");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
