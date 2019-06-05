'user strict'

const express = require('express');
const app = express();

app.get(/\path1/,/path2/g, (req, res) => {
    //const param1 = req.params.param1;
    res.send(`Hello`);
  });

app.listen(3000);