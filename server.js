const express = require('express');
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const bodyParser = require('body-parser')
const apiRoute = require('./src/route/api');
app.use('/api', apiRoute);
app.use(bodyParser.json());

const wakeUpDyno = require("./src/route/wakeUpDyno.js")

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const DYNO_URL = "https://web2020-test.herokuapp.com"
app.listen(port, ()=>{
    wakeUpDyno(DYNO_URL);
});
console.log("Server Ready!")
