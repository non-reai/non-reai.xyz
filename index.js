import express from 'express';

const app = express();

app.use("/", express.static('public'));

app.use("/assets", express.static('assets'));

app.listen(5230);
