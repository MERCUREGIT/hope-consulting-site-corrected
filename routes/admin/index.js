const express = require('express');
const router = express.Router();
const fs = require('fs');
const dashboard_url = "https://hope-consulting-admin.netlify.app/";


require('./delete')(router, fs, dashboard_url);
require('./post')(router, dashboard_url);
require('./get')(router, dashboard_url);


module.exports = router;
