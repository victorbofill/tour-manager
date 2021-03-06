require('dotenv').config({path: './test/e2e/.env' });
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');

before(() => connect(process.env.MONGODB_URI || 'mongodb://mongodb@localhost:27017/tours'));
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};