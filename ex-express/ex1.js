'user strict'

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    const ip = req.ip;
    const myParam = req.query.asd;
    res.send(`${myParam} ${ip}`);
  });

app.listen(3000);