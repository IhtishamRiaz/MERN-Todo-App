const express = require('express');
const cors = require('cors');
const route = require('./routes/routes.js');
const Connection = require('./database/db.js');

Connection();
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(route);

app.listen(port, () => console.log(`Server Started at http://localhost:${port}`))