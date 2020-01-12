const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
const express = require('express');

const app = express();

const cors = require("cors");
app.use(cors());


app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

app.use('/Front-office', express.static('../Front-end-gestor-espaco/Front-office/'));
app.use('/Back-office', express.static('../Front-end-gestor-espaco/Back-office/'));

const server = app.listen(port, host, function(err) {
  if (!err) {
    console.log("Servidor a funcionar na porta %s...", server.address().port);
  }
  else {
    console.log(err);
  }
});

module.exports = app;
require('./loader.js');
