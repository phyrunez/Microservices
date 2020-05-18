# Blog

**Service scripts**:

There are several services in the project need to run, including:
* Posts (Port 4000)
* Comments (Port 4001)
* Query (Port 4002)
* Moderation (Port 4003)

All connect to:

* Event Bus (Port 4005)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the each of directory, you can run:

`npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits, you will also see any lint errors in the console.

**Necessary frameworks and libraries**:

In some directories, you should install:

`npm install express axios cors nodemon`
