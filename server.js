const express = require('express');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(cors());

//Importing Routes
const pdfRouter = require('./routes/pdfRoute');

//Configuring Routes
app.use('/', pdfRouter);


//Listening on the port
app.listen(port, () => {
    console.log(`Server started running on port ${port}`);
});