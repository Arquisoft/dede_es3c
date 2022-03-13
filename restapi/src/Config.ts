
require('dotenv').config();

 
 // Config API cloudinary

 var cloudinary = require('cloudinary').v2;

 cloudinary.config({ 
    cloud_name: 'dedesktop', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
    secure: true
  });


