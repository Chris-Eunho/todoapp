let fs = require('fs');
let path = require('path');
let User = require('../models/usersModel');

exports.getError = function(req,res){  
    res.writeHead(404, {'Content-Type': 'text/html'});
    fs.readFile('./404.html', function(err,data) {
        if(err) {
            console.log(err)
        } else {
            res.write(data.toString())
        }
        res.end();
    });
}