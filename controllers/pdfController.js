
module.exports = {
    uploadPDF: (req, res) => {
        console.log(req.file);
    },
    displayPDF: (req, res) => {
        console.log('display-api-true');
    },
    createNewPDF: (req, res) => {
        console.log(req.body);
    }


}