const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    company: CompanySchema
});

const User = mongoose.model('Restaurant', UserSchema);

module.exports = { User };
