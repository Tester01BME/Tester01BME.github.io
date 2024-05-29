const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: File upload only supports the following filetypes - ' + filetypes);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(express.static(path.join(__dirname)));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded or invalid file format.' });
    }

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, 'uploads', `${req.file.filename}-${req.file.originalname}`);

    fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).json({ message: 'File processing error.' });

        res.status(200).json({ message: 'File uploaded successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
