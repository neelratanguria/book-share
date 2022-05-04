const Parse = require('parse/node');

Parse.initialize(process.env.BOOK_SHARE_APP_ID, process.env.BOOK_SHARE_APP_KEY); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.masterKey = process.env.BOOK_SHARE_MASTER_KEY;
Parse.serverURL = "https://parseapi.back4app.com/";