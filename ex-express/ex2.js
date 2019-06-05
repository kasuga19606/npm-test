'user strict'

const express = require('express');
const app = express();

app.get('/path1/:param1', (req, res) => {
    //const ip = req.ip;
    const param1 = req.params.param1;
    res.send(`${param1}`);
  });

app.listen(3000);