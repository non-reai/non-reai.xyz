import express from 'express';
import compression from 'compression';

const app = express();

app.use("/", express.static('public'));

app.use(compression())

app.use("/assets", express.static('assets'));

app.listen(5230);
