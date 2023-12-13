const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 100 MB
});

module.exports = upload;