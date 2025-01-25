const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String },
    role: { type: String },
    calendarIds: { type: Schema.Types.Array }
})

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

/**
 * A model is like an interface between your applications and the MongoDB database. 
 * It allows you to create, modify, read, and delete data in the database using a schema that it has previously defined.
A model uses the schema as a basis for defining data structure and validation.
 */