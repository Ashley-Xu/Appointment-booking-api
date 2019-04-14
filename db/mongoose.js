'use strict';

const mongoose = require('mongoose');//load package
require("dotenv").config();//read environment variables from .env

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true});

module.exports = {
	mongoose
}