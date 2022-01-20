const mongoose = require("mongoose");
const SchemaTemplate = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const SchemaContact = mongoose.model("userData", SchemaTemplate);
module.exports = SchemaContact;
