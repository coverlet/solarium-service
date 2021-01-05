require('dotenv').config()
const { startService } = require("./sprite-service");


// TODO send errors to influs, add stats for fetching
startService();
