const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
// Enable CORS for frontend
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = 3001;

// Directory for uploads
const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');

// Serve static files (including uploads)
app.use('/uploads', express.static(UPLOAD_DIR));
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup (no file type/size restrictions)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // No sanitization
  }
});
const upload = multer({ storage });

// Homepage route
app.get('/', (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) return res.status(500).send('Error reading uploads directory');
    let scriptTags = '';
    files.forEach(file => {
      if (file.endsWith('.js')) {
        scriptTags += `<script src="/uploads/${file}"></script>`;
      }
    });
    res.send(`
      <html>
        <head><title>Vulnerable File Upload Demo</title></head>
        <body>
          <h1>Vulnerable File Upload Demo</h1>
          <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
          <h2>Uploaded .js Files:</h2>
          <ul>
            ${files.filter(f => f.endsWith('.js')).map(f => `<li>${f}</li>`).join('')}
          </ul>
          ${scriptTags}
        </body>
      </html>
    `);
  });
});

// File upload endpoint (no validation)
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

// No CSP headers set

app.listen(PORT, () => {
  console.log(`Vulnerable app listening on http://localhost:${PORT}`);
});
