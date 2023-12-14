const express = require('express');
const fs = require('fs');
const path = require('path');


module.exports = {
    uploadPDF: (req, res) => {
        try {
            const fileId = req.fileId;
            if (fileId) {
                return res.status(200).json(fileId);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Server Unexpected Error, Please try again later!' });
        }
    },
    displayPDF: async (req, res) => {
        try {
            const { fileId } = req.query;
            const filePath = path.join(__dirname, '..', 'uploads', `${fileId}.pdf`);

            const fileExists = await fs.promises.access(filePath, fs.constants.F_OK)
                .then(() => true)
                .catch(() => false);

            if (!fileExists) {
                return res.status(404).json({ error: 'File not found, try again.' });
            };

            const fileData = await fs.promises.readFile(filePath);

            return res.status(200).setHeader('Content-Type', 'application/pdf').send(fileData);
        } catch (error) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Server Unexpected Error, Please try again later!' });
        }
    },
    createNewPDF: (req, res) => {
        console.log(req.body);
    }


}