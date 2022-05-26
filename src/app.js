require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const { appConfig, dbConfig } = require('./config');
const { apiRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(apiRouter);

app.listen(appConfig.PORT, async () => {
  console.log(`Server on PORT ${appConfig.PORT} has started`);

  try {
    await mongoose.connect(dbConfig.URL);
    console.log('DB CONNECTED');
  } catch (e) {
    console.log(e);
  }
});
