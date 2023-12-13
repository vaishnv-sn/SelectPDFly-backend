const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Please upload a PDF file.'), false);
    }
};

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const fileId = uuidv4();
        cb(null, fileId + path.extname(file.originalname));
        req.fileId = fileId;
    }
});

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;