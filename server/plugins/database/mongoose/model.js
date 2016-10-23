const Mongoose = require('mongoose');
const ClassWrapper = require('./class-wrapper');
const Model = require('../model');

class MongooseModel extends Model{

  static model() {
    // Create mongoose schema
    let schema = new Mongoose.Schema(this.schema());

    // Add methods from class to schema
    schema.plugin(ClassWrapper, this);

    // Create and return a mongoose model
    return Mongoose.model(this.name, schema);
  }

}

module.exports = MongooseModel;
