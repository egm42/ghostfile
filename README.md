# ghostfile

This is the source code for [ghostfile.io](ghostfile.io). The functionality of this site is to create a one-time download link for any file(under 2GB). 

This site is still a work in progress.

 __TODO__
* ~~file ttl~~ - Configured MongoDB and S3 to auto delete files after 7 days
* ~~file upload limit~~ - Implemented server-side and client-side upload limit to 2GB
* ~~encrypt files~~ - Implemented server-side encryption using AES256
* user set expiration
* multi-file uploads
* migrate AWS SDK for JavaScript v3
* unit tests

---

### __Installing node modules__:
```
cd client
npm install
cd ../server
npm install
```

### __Building and running the application__:
```
cd client
npm run build
cd ../server
npm start
```

### __Environment variables in `.env` file located in the server folder__
```
PORT=<port>
MONGODB_URI=<mongodb uri>
MONGODB_USER=<mongodb user>
MONGODB_PASSWORD=<mongodb password>
ACCESS_KEY=<access key>
SECRET_ACCESS_KEY=<secret access key>
WASABI_ENDPOINT=<wasabi endpoint>
NODE_ENV=<environment>
```
