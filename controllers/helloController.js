function helloController(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Добро пожаловать в LMS backend!' }));
}

module.exports = { helloController };
