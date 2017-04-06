'use strict';
var http = require('http');
var path = require('path');
var express = require('express');

var router = express();
var server = http.createServer(router);

router.set('views', './');
router.set('view engine', 'ejs');
router.engine('html', require('ejs').renderFile);
router.use(express.static(path.resolve(__dirname)));
router.get('/', (req, res) => {
    res.render(`./public/index.html`);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
  console.log(`project URL: https://${process.env.C9_HOSTNAME}`);
});
