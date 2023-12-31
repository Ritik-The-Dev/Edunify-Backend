const mongoose = require("mongoose")

const SchoolSchema = mongoose.Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  contact_number: { type: Number },
  imageUrl:{type:String},
  createdAt:{type:Date,default:Date.now()}
});


module.exports = new mongoose.model("SchoolSchema", SchoolSchema);