const express = require('express');
const multer = require('multer');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const upload = multer({dest: './uploads/'});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let files = {};

function deleteFile(file) {
  fs.unlink(`./uploads/${file}`, (err) => {
    if (err) {
      console.log(err);
    }
    delete files[file];
  });
}

function cleanFiles() {
  for (var file in files) {
    if (files[file].ttl <= Date.now()) {
      console.log('Deleting file: ' + file);
      deleteFile(file);
    }
  }
}

app.get('/', (req, res) => {
  res.json({message: 'GhostFile server is online'});
});

app.get('/download', (req, res) => {
  console.log('File download requested: ', req.query.id);
  try {
    const file = files[req.query.id];

    if (file != undefined) {
      console.log('Sending file: ', file.originalname)
      res.download(`./uploads/${req.query.id}`, file.originalname, () => {
        // deleteFile(req.query.id);
      });
    }
  } catch (e) {
    console.log(`Failed to return file ${req.query.id}`, e);
    res.status(404).json({message: `File not available`});
  }
});

app.get('/details', (req, res) => {
  console.log(req.query.id);
  if (Object.keys(files).includes(req.query.id)) {
    console.log('File found: ', req.query.id);
    res.json({
      message: 'File found',
      fileDetails: files[req.query.id],
      testUrl: `http://localhost:3000/download?id=${req.file.filename}`,
      url: `https://www.ghostfile.io/download?id=${req.file.filename}`
    });
  } else {
    console.log('File not found: ', req.query.id);
    res.json({
      message: 'File not found'
    });
  }
});

app.post("/upload", upload.single('file'), (req, res) => {
  try {
    let file = req.file;
    file['ttl'] = Date.now() + 8640000;
    files[req.file.filename] = file;
    res.json({
      message: 'Upload successful',
      testUrl: `http://localhost:3000/download?id=${req.file.filename}`,
      url: `https://www.ghostfile.com/download?id=${req.file.filename}`
    });
    cleanFiles();
  } catch (e) {
    console.log(`Failed to save file ${req.file}`, e);
    res.status(500).json({message: 'Upload failed'});
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

