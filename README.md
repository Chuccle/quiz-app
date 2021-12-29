
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## Deploying backend

This repository contains a SQL schema (db.js) and a backend nodejs server (server.js) 

1. You are going to want to run the SQL schema in a database and it will construct all the fields you need. 

IMPORTANT: You are also going to need to modify the .env to have a much more secure (ideally hashed) JWT secret

2. You will need to reconfigure the .env file in the /src directory to your database configuration details.

3. Inside src\components\res\FetchFunc.js replace 'http://localhost:8080' with the URL of your backend.

4. Inside src\server\server.js customise the limiter constant to include the desired values 

5. Deploy server.js by going \quiz-app\src\server and run 'node server.js'


