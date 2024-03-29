# Tictactoe

Project is based on a very popular social game called Tic-Tac-Toe. Game board consists of 9 fields table. Players mark their chosen spots in turns with the main goal to connect 3 fields in one straight line in any direction.

# Installation
In order to run the project locally, you need to install node.js on your machine. Head to the [NODE.JS](https://nodejs.org/en) and download the latest stable version of the program. Install it on your machine.

Node.js is basically a javascript engine very similar to the regular browser one you're using every time you use your web browser. The difference is it has many more functionalities that are not tied to regular browser, but are made for backend part of the app.

You also need mongodb as a backend database provider. Head to the [mongodb](https://www.mongodb.com/atlas), download atlas and install it on your machine. It should already have the required address in order to create database at the start.

# Backend start
Download the code provided on [this link](https://github.com/aleksbn/tictactoe-backend-node.js), copy it to the location you would like it to be stationed and open up your console.
Go to the folder you copied the project to. In case you need to go a folder up, type:
```
cd ..
```
and in case you need to go down the folder paths, type in:
```
cd \documents\tictactoe
```
This is, of course, just an example of the location we need. If, for any reason, your preffered folder is on another disk, say, disk D, type in
```
d:
```
in order to change path to disk D.

# Installing libraries
By default, most of the projects on github are stored without node_modules folder that consists of many required libraries in order to run the project. In order to download them, type in
```
npm install
```
And that's it, the required libraries are downloaded.
# Running the app
Before starting the backend, you need mongodb to be running. Open up new console (location is irrelevant) and type in
```
mongod
```
In case you get an error stating the following: "'mongod' is not recognized as an internal or external command, operable program or batch file", it means you must add local variable to your operative system. Here's the [info](https://stackoverflow.com/questions/51224959/mongo-is-not-recognized-as-an-internal-or-external-command-operable-program-o) on how do you do it on windows 10. I'm sure other operative systems follow similar steps. And that's it. Now, head back to the console window where you started libraries installation and type in 
```
npm start
```
and voila! The app is running on address [http://localhost:3900/](http://localhost:3900/)

# Frontend start, install and running the app
Download frontend app from this repo. Repeat the stepps of downloading code, isntalling libraries and starting the app. Of course, mongodb is already started and there's no need for doing it again.

# Data seeding
Now, if you want to generate some random data, you can use built-in function for that. Just open your postman to make a request, or go to your browser and type in the following address: http://localhost:3900/generate. At the end of the url, you need to add the number of players you want to generate, as well as the number of games per player. In example, if I want 5 players with 4 games per player, I would go (or make a request in postman) to http://localhost:3900/generate/5/4. If you're interested in using the data, just open mongodb compass, head to the tictactoe db and see user names you generated. Password for every player is nickname+"sifra". In example, for user alex, password is alexsifra.

# Architecture considerations
Project is using 3 layers:
1. MongoDB (database)
2. Node.js (backend)
3. React (frontend)

Game is using JWT token as a form of authentication. It has auth middleware that controlls every access to the backend endpoints. Typescript is making sure that all the data are strongly typed and sockets are providing the players with live communication. Endpoints access is supported by router created by the Express library.

# Node.js backend libraries
List of used libraries is following:
1. bcrypt v5.1.1 for hashing passwords
2. config v3.3.9 for configuration settings
3. cors v2.8.5 for configuring policies and allowing frontend to connect to backend
4. express v4.18.2 for creating node.js server
5. joi v17.11.0 for validating data
6. jsonwebtoken v9.0.2 for working with jwt token for authentication
7. lodash v4.17.21 for working with arrays and data structures
8. nodemon v3.0.1 for keeping server live without the need to restart it every time when you change something in files
9. mongoose v8.0.0 for connecting with mongodb database
10. socket.io v4.7.2 for making live communications between players
11. ts-node v3.0.1 for starting the app in typescript mode
12. typescript v5.2.2 for making types being used in the app

# React frontend libraries
List of used libraries is following:
1. axios v0.18.1 for making easier requests to server
2. bootstrap v4.1.1 for styling the app display
3. font-awesome v4.7 for adding new and interesting icons and fonts
4. joi-browser v13.4 for frontend validation
5. jquery v3.7.1 for making navbar responsive
6. jwt-decode v2.2 for decoding jwt token sent from backend
7. lodash v4.17.10 for working with arrays and data structures
8. popper.js v1.16.1 for making navbar responsive
9. react v18.2.0 as the core library for making react apps
10. react-bootstrap v2.9.1 for adding bootstrap to react
11. react-dom v18.2.0 for manipulating DOM with react
12. react-router-dom v4.3.1 for working with routes
13. react+scripts v5.0.1 for working with scripts in react
14. react-toastify v4.1 for making messages more interesting
15. socket.io-client v4.7.2 for live communication between users
16. typescript v4.9.5 for making types being used in the app
17. web-vitals v2.1.4 as a part of react app
