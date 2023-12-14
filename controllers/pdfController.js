const express = require('express');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');


module.exports = {
    uploadPDF: (req, res) => {
        try {
            const fileId = req.fileId;
            if (fileId) {
                return res.status(200).json({ fileId });
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
    createNewPDF: async (req, res) => {
        try {
            const { fileId } = req.query;
            const { selectedPages } = req.body;

            const filePath = path.join(__dirname, '..', 'uploads', `${fileId}.pdf`);

            const fileExists = await fs.promises.access(filePath, fs.constants.F_OK)
                .then(() => true)
                .catch(() => false);

            if (!fileExists) {
                return res.status(404).json({ error: 'File not found, try again.' });
            };

            const fileData = await fs.promises.readFile(filePath);

            const uint8ArrayOfBuffer = new Uint8Array(fileData);
            const srcDoc = await PDFDocument.load(uint8ArrayOfBuffer);

            if (!(srcDoc instanceof PDFDocument)) {
                return res.status(404).json({ error: 'Loaded PDF is not of type PDFDocument' });
            }

            const newPdfDoc = await PDFDocument.create();

            const copyOfPages = await Promise.all(
                selectedPages.map(async (pageNumber) => {
                    // Adjust index (as page numbers start from 1, while indices start from 0)
                    const pageIndex = pageNumber - 1;
                    const selectedPage = await newPdfDoc.copyPages(srcDoc, [pageIndex]);
                    return selectedPage[0]
                })
            );
            newPdfDoc.addPage(...copyOfPages);

            const pdfBytes = await newPdfDoc.save();

            const buffer = Buffer.from(pdfBytes);
            const pdfBase64String = buffer.toString('base64');

            return res.status(200).json({ pdfBase64String });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error processing the PDF.' });
        }
    }


}