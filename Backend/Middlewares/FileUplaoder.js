
// This code is setting up a file uploader using Multer and Cloudinary in a Node.js application.
// This code post image on cloudinary website and that image only "url" we post on mongodb database

// In frontend we get image from cloudinary using put Method 

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0] + ""
    },
});

const cloudinaryFileUploader = multer({ storage: storage });

module.exports = {
    cloudinaryFileUploader
}