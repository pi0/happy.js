const Config = require('../config');
const Mongoose = require('mongoose');

require('../utils/colors');
require('../server/plugins/database/mongoose');

const MongoConfig = Config.get('database.mongodb');
Mongoose.connect(MongoConfig.uri, MongoConfig.options);
