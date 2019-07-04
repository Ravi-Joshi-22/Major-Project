# Major-Project

## Demo
https://smarthyre.herokuapp.com/



## Folder Structure

-------------------------------------------
```
|---app
    |---contollers
        |---admin
        |---app
        |---company
        |---interviewee
    |---helpers
    |---modals  
|---bin
|---client
    |---public
    |---src
        |---actions
            |---app
            |---company
            |---interview
            |---interviewee
        |---components
            |---common
            |---companyDashoboard
            |---interview
            |---companyDashoboard
            |---login
            |---register
            |---userDashboard
            |---userProfile
        |---pages
            |---companyDashoboard
            |---companyRegistration
            |---interview
            |---intervieweeRegistration
            |---login
            |---userDashboard
        |---reducers
            |---app
            |---company
            |---interview
            |---interviewee
|---config
|---lib
    |---admin
    |---app
    |---company
    |---interviewee
|---templates
    |---activation
    |---applied
    |---opening
    |---selection
    |---rejection
|---tests
|---uploads
|---app.js
|---package.json
|---package-lock.json
|---Procfile
```
The above gives a basic overview of folder structure which we are going to follow, a basic details about each one of them is being explained below:

### App
-----------------
This folder is going to contain all the server request / response logic along with the models which are to be used for our databases.
The app folder in itself is going to contain three subfolders:

#### controller
This is explicitly going to contain only the request / response logic, no other logic should go in here

#### models
This is where we define our mongoDB models, along with all the relationships. We should make sure that all the file names matches the name of the entity and is named appropriately.

#### helpers
This is where we put in functions that might do small unit of work for reuse in multiple places. For example this might include a function that takes in a date and returns a date with 1 week added to it. We'll create helper functions whenever we need them.

### Bin
-----------------
This is where the httpServer is initialised and our app starts listening on a port. If you need more details about why this has been separated out of our `app.js` then https://stackoverflow.com/questions/23169941/what-does-bin-www-do-in-express-4-x is a good link to go through.

### Client
-----------------

### public
This is where our react bundle is created and all static files and modules are loaded. This serve the first paage of file and includes header which have all the required scripts and links.

### src
This folder contains all the required actions , components , pages and reducers. It consist of all the front-end related code and redux functionality.

### actions
This folder consist of all the required api calls which are required to be made across the application and need to connect front-end with back-end.

### components
This folder consist of basic subparts and components which are required on a specific page or across all the pages. Ex:-- Navbar, Side Drawer, Error-Box, Success-Box.

### pages
This folder contains different pages which are need to be served with their required component. This pages are connected to their required route and linked with a URL in  clients `app.js`

### reducers
This folder contains all the redux related functionality and various states which are required across the complete application which are mapped to their required actions within switch case.

### Config
-----------------
Config is going to contain all the information related to the environment variables, the index.js file in the file exports a function which returns config variables based on the specific environment in which it is.
The other three files `development.js`and `production.js` is going to contain the respective environment variables.

### Lib
------------------
Lib is going to contain all the database fetch operations. The folder structure here must maintain the same structure as that of the controllers. So for example if we are writing a database fetch logic for an admin request then it must go inside the `admin` folder. One more thing needs to be ensured that the file names should match up the fetch operations that are coded inside. 
So if the fetch operation involves fetching from the `interviewee` entity by the company then the filename should also be `company.js` under the `interviewee` folder.
In case there needs to be a database operation that involves CRUD operation on multiple entities at a time, then it should go inside `app` folder.

The lib folder is also having `db_connect.js` in it which connects with the MongoDB database and should only contain code, corresponding to the connection of the database.

### Templates
-----------------
This folder consist of various email-template design required to send various types of emails from the backend .Ex:-- Selection mail, Rejection mail , Account Creation mail etc.

### Tests
-----------------
This is where we will be defining our test cases and write them accordingly.

### Uploads
-----------------
This will contain all the uploaded files and images for diiferent users.

### app.js
-----------------
This is the starting point for our express app, and contains all the middlewares and link to startup scripts like connecting with the database and all.

### Procfile
-----------------
This file  used for the deployment of the application on heroku and scripts related to deployment.



## Project Setup
-----------------------------------

For starting up with the project, the following dependencies needs to be met:

 1. Node.js
 2. MongoDB

The following steps needs to be followed in order to start the server:

 1. Clone the repository
 2. Start your mongoDB server
 3. Navigate into the project directory
 4. Use the command `npm run server`
 5. Navigate into the project client directory
 6. Use the command `npm start`

Upon successful starting one should see the following message up in the main console:
```
Listening on port 3000
Mongo DB Connected
```

Upon successful starting one should see the following message up in the client console:
```
Starting the development server...

> client@0.1.0 start d:\ReactFullStack\Major-Project\client
> react-scripts start

[HPM] Proxy created: function (pathname) {
        return mayProxy(pathname) && pathname.match(context);
      }  ->  http://localhost:2000/
Compiled with warnings.
```




