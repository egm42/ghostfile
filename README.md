# ghostfile

Create a one time use link to share files. The file is deleted after it is downloaded.

Installing node modules:
```
cd client
npm install
cd ../server
npm install
```

Building and running the application:
```
cd client
npm run build
cd ../server
npm run dev
```

Environment variables in `.env` file located in the server folder
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
