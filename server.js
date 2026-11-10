const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ensure upload folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        // Generate a random 6-digit code for the file
        const code = Math.floor(100000 + Math.random() * 900000);
        cb(null, `${code}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname)); // Serves your HTML/CSS/JS frontend

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    const filename = req.file.filename;
    const code = filename.split('_')[0];
    res.json({ success: true, code: code, originalName: req.file.originalname });
});

// Download endpoint
app.get('/download/:code', (req, res) => {
    const code = req.params.code;
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.status(500).send('Server error');
        const targetFile = files.find(f => f.startsWith(code + '_'));
        if (!targetFile) return res.status(404).send('File not found');
        
        const filePath = path.join(uploadDir, targetFile);
        const originalName = targetFile.substring(targetFile.indexOf('_') + 1);
        res.download(filePath, originalName);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running! Access it locally via http://localhost:${PORT}`);
});