require('dotenv').config();
const express = require('express');

const { appConfig } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(appConfig.PORT, () => {
  console.log(`Server on PORT ${appConfig.PORT} has started`);
});
