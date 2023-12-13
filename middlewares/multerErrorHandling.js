const handleUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
    } else if (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    } else {
        next();
    }
};

module.exports = handleUploadErrors;