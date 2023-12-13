const express = require('express');
const router = express.Router();
const { uploadPDF, displayPDF, createNewPDF } = require('../controllers/pdfController');
const upload = require('../config/multerConfig');

router.route('/upload-pdf').post(upload.single('pdfFile'), uploadPDF);
router.route('/display-pdf').get(displayPDF);
router.route('/create-pdf').post(createNewPDF);

module.exports = router;