# ghostfile

This is the source code for [ghostfile.io](ghostfile.io). The functionality of this site is to create a one-time download link for any file(under 2GB). 

This site is still a work in progress.

 __TODO__
* encrypt files
* user set expiration
* multi-file uploads

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
