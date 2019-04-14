"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// Mongoose
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user')

// Express
const port = process.env.PORT
const app = express();
app.use(bodyParser.json());


// wrap async f in promise
const async_ = f => (q, r, n) => {Promise.resolve(f(q, r, n)).catch(n)}

// function f(parameters) {...}
// f = (parameters) => {...}

app.post("/searchusers", async_(async (q, r, n) => {
    // extract body content from request
    const {org_name, user_name} = q.body;

    // build regex for name matching
    const org_ex = new RegExp(org_name, "i");
    const name_ex = new RegExp(user_name, "i");

    // Model.find returns promise. await to pause until promise is resolved/rejected
    // alternatively:
    // User.find(...).then(users => {handler...}).catch(error => {error handler...})
    const users = await User.find({
        company: {name: org_ex},
        name: name_ex
    });

    r.json({users});
}));


app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});