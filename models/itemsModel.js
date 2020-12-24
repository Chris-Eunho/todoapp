let mongooose = require('mongoose');
const { stringify } = require('querystring');

let Scheme = mongooose.Schema;

let itemsSchema = new Scheme( {
 item : String,
 username : String,
 password : String,

});

module.exports = mongooose.model('items', itemsSchema);