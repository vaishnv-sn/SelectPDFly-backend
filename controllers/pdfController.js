
module.exports = {
    uploadPDF: (req, res) => {
        try {
            const fileId = req.fileId;
            if (fileId) {
                res.status(200).json(fileId);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Unexpected Error, Please try again later!' });
        }
    },
    displayPDF: (req, res) => {
        console.log('display-api-true');
    },
    createNewPDF: (req, res) => {
        console.log(req.body);
    }


}