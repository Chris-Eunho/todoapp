let fs = require('fs');
let path = require('path');
let User = require('../models/usersModel');

exports.getSignUpPage = function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    
    let signUpHtmlPath = path.join(__dirname,'..','views','signup.html');
    
    fs.readFile(signUpHtmlPath, function(err,data) {
        if(err) {
            console.log(err)
        } else {
            res.write(data.toString())
        }
        res.end();
    });
}

exports.getSignUpExistPage = function(req,res) {
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    let signUpExistHtmlPath = path.join(__dirname,'..','views','signupExist.html');
    fs.readFile(signUpExistHtmlPath, function(err,data) {
        if(err) {
            console.log(err)
        } else {
            res.write(data.toString())
        }
        res.end();
    });
}

exports.postSignUpPage = function(req,res) {
    let data = [];
        req.on('data', function(chunk) {
            data.push(chunk);
        })
        req.on('end', function() {
            let str = Buffer.concat(data).toString();
            let str_username = str.split('&')[0].split('=')[1];
            let str_password = str.split('&')[1].split('=')[1];
            let str_imageNumber = str.split('&')[2].split('=')[1];
            
            User.find({username:str_username, password:str_password}, function(err,records) {
                if(err) {console.log(err);}
                else if(records.length==1) {             
                        res.writeHead(301, {'Location' : '/signup/exist'});
                        res.end();
                    } 
                else {
                    let _item = new User({username: str_username,
                    password: str_password,
                    imageNumber: str_imageNumber});
                    _item.save(function(err) {
                        if(err) {console.log(err)}
                        else {
                            res.writeHead(301, {'Location' : '/'});
                            res.end();
                            }
                        })
                     }
            })
        })
}