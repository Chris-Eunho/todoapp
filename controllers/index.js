let http = require('http');
let loginController = require('./controllers/loginController');
let itemController = require('./controllers/itemsController');
let signUpController = require('./controllers/signUpController');
let errorController = require('./controllers/errorController')

let NodeSession = require('node-session');

// https://www.npmjs.com/package/node-session
let session = new NodeSession({secret:'gajg761761','lifetime': 3000000});  // IT CAN BE ANY SECRET KEY

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase'); // connect with mongoose

let db = mongoose.connection; // connect with mongoose
db.once('open', function() {
    console.log('Connection was succesfull'); //execute this callback function when an event 'open' occurs
})

http.createServer(function(req, res) {
    let method = req.method;
    let url = req.url;
    session.startSession(req,res,function() {
        if (method=='GET' && url=='/') { // When user enters the website, where location is at default

            loginController.getLoginPage(req,res);
            
        } else if (method=='POST' && url=='/') {  // When user submits the form on the login page

            loginController.postLoginPage(req,res);

        } else if (method=='GET' && url=='/signup') {
         
            signUpController.getSignUpPage(req,res);
        
        } else if (method=='GET' && url=='/signup/exist') {

            signUpController.getSignUpExistPage(req,res);
    
        } else if (method=='POST' && url=='/signup') {  

            signUpController.postSignUpPage(req,res);
        
        } else if (method=='GET' && url=='/list/all') { 
                
            itemController.getListAllPage(req,res);

        } else if (method=='POST' && url=='/list/all') { 
                
            itemController.postItemPage(req,res);
            
        } else if (method=='GET' && url=='/list/mine') { 
                
            itemController.getListMinePage(req,res);

        } else if (method=='POST' && url=='/list/mine') { 
                
            itemController.postItemPage(req,res);
            
        }
        
        else {
            errorController.getError(req,res);
        }
    });

}).listen(3000); // bring it to localhost: 3000