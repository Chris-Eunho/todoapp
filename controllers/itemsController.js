
let Item = require('../models/itemsModel');
let User = require('../models/usersModel');
let topAll = require('../views/partials/pageListAllTop');
let topMine = require('../views/partials/pageListMineTop');
let bottom = require('../views/partials/pageListBottom');

exports.getListAllPage = function(req,res) {
    /* 
        retreive username / password in session
        saved in loginController.postLoginPage method
    */   
    res.writeHead(200,{'Content-Type': 'text/html'} )
    /*
    create a ul 
    <ul>
        <li>Sleeping</li>
        <li>Playing</li>
        .......
    </ul>
    */
   // send => top + ul + bottom
    Item.find(function(err, records) {
        if(err) {console.log(err);}
        else {
            let ul = '<ul>';

            for(let i =0 ; i< records.length; i++) {
                let item = records[i].item;
                let li = `<li>${item}</li>`;
                ul = ul + li;
            }

            ul = ul + '</ul>';
            res.write(topAll + ul + bottom);
            res.end();
        }
    });        
}


exports.getListMinePage = function(req,res) {
    let username = req.session.get('username')
    let password = req.session.get('pword')
    res.writeHead(200,{'Content-Type': 'text/html'} )
    Item.find(function(err, records) {
        if(err) {console.log(err);}
        else {
            let ul = '<ul>';

            for(let i =0 ; i< records.length; i++) {
                let itemUser = records[i].username;
                let itemPassword = records[i].password;
                if(itemUser == username && itemPassword == password) {
                    let item = records[i].item;
                    let li = `<li>${item}</li>`;
                    ul = ul + li;
                }
            }

    User.find({username:username, password:password}, function(err,records){
        if(err) {console.log(err);}
        else {
        let imageNumber = records[0].imageNumber;
        
    
            ul = ul + '</ul>';
            let profile_src = `https://randomuser.me/api/portraits/men/${imageNumber}.jpg`;
            let profile = `<img src=${profile_src}>`
            res.write(topMine + profile + ul + bottom);
            res.end();
        }
        })
        }
    });        
}

exports.postItemPage = function(req,res) {
    let data = [];
        req.on('data', function(chunk) {
            data.push(chunk);
        })
        req.on('end', function() {
            let str = Buffer.concat(data).toString();
            // str = item=sleep
            let info = str.split('=')[1];
            let _item = new Item({item: info, username: req.session.get('username'), password: req.session.get('pword') });

            _item.save(function(err) {
                if(err) {console.log(err)}
                else {
                    res.writeHead(301, {'Location' : req.url});
                    res.end();
                }
            })
        })
}