const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', 'server.log');

function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
    console.log(message);
}

module.exports = { log };
