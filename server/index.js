const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const crypto = require("crypto");
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'development'

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const wasabiEndpoint = new aws.Endpoint(process.env.WASABI_ENDPOINT);

const s3 = new aws.S3({
  endpoint: wasabiEndpoint
});

function createKey() {
  return crypto.randomBytes(16).toString("hex");
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ghostfile',
    key: function(req, file, cb) {
      cb(null, createKey());
    },
    acl: 'public-read',
  })
});

const presignedUpload = (key, originalFilename) => {
  let url = s3.getSignedUrl('getObject', {
      Bucket: 'ghostfile',
      Key: key,
      Expires: 1000, //time to expire in seconds
      ResponseContentDisposition: 'attachment; filename ="' + originalFilename + '"'
  });
  return url;
};

const deleteWasabiFile = (key) => {
  console.log('Deleting wasabi file: ', key)
  let params = {
    Bucket: 'ghostfile',
    Key: key
  }
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log('Failed to delete object with id: ', key);
      console.log(err);
    }
  });
}

const app = express();
const server = require('http').createServer(app);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "..", "client", "build")));

let mongoURI = process.env.MONGODB_URI.replace('<username>', process.env.MONGODB_USER).replace('<password>', process.env.MONGODB_PASSWORD);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

async function addFileEntry(file) {
  try {
    console.log('Adding mongo entry: ', file.key)
    const col = client.db("ghostfile").collection("files");
    col.insertOne(file);
  } catch (e) {
    console.log(e);
  }
}

async function getFileEntry(id) {
  try {
    console.log("Geting entry details: ", id);
    const col = client.db("ghostfile").collection("files");
    const query = {"key": id};
    const cursor = col.findOne(query);
    return cursor;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function deleteMongoFile(id) {
  try {
    console.log("Deleting mongo entry: ", id)
    const col = client.db("ghostfile").collection("files");
    const query = {"key": id};
    const cursor = col.deleteOne(query);
    return cursor;
  } catch (e) {
    console.log(e);
    return false;
  }
}

function deleteFile(id) {
  deleteWasabiFile(id);
  deleteMongoFile(id);
}

app.get('/api', (req, res) => {
  res.json({
    message: 'GhostFile server is online!',
    port: process.env.SERVER_PORT
  });
});

app.get('/api/delete', (req, res) => {
  console.log('File download requested: ', req.query.id);
  console.log(req.query.id);
  deleteFile(req.query.id);
  res.json({
    message: "Delete successful"
  })
});

app.get('/api/details', (req, res) => {
  try {
    getFileEntry(req.query.id).then((result) => {
      const signedUrl = presignedUpload(req.query.id, result.originalname)
      if(result) {
        res.json({
          message: "File found",
          fileDetails: {
            originalname: result.originalname,
            key: result.key,
            ttl: result.ttl,
            location: signedUrl          }
        });
      } else {
        res.status(404).json({
          message: "File not found"
        })
      }
    }).catch((e) => {
      console.log(e);
      res.status(404).json({
        message: "File not found"
      })
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: "File not found"
    })
  }
});

function getDownloadUrl(key) {
  if (env == 'development') {
    return `http://localhost:3000/download?id=${key}`
  } else {
    return `https://www.ghostfile.io/download?id=${key}`
  }
}

app.post("/api/upload", upload.single('file'), (req, res) => {
  try {
    let file = req.file;
    file['ttl'] = new Date(Date.now() + 604800000); // Files expire in 7 days
    addFileEntry(file);
    res.json({
      message: 'Upload successful',
      ttl: file['ttl'],
      url: getDownloadUrl(file.key)
    });
  } catch (e) {
    console.log(`Failed to save file ${req.file}`, e);
    res.status(500).json({message: 'Upload failed'});
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
server.listen(port, () => console.log("Server is running on port: ", port));