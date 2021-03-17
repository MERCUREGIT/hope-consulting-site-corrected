const express = require('express');
const router = express.Router();
const fs = require('fs');
const dashboard_url = "https://hope-consulting-dashboard.netlify.app/";


const delRoutes = require('./delete')(router, fs, dashboard_url);
const postRoutes = require('./post')(router, dashboard_url);
const getRoutes = require('./get')(router, dashboard_url);


module.exports = router;
