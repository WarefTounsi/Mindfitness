const mongoose = require("mongoose");
const idPlugin = require("mongoose-id");
const config = require("../config/config.js");

const purchaseSchema = mongoose.Schema({
     purchase: { type: mongoose.Schema.Types.ObjectId, required: true },
     owner: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required: true,    
     },
     advantages: [String],
     image:{
          type:String,
          required: true
     },
     status: {
          type: String,
          enum: ["PAID", "UNPAID"],
          default: "UNPAID"
     },
     paymentId: {
          type: String,
          default: ""
     }
});

purchaseSchema.plugin(idPlugin);
module.exports = mongoose.model("Purchase", purchaseSchema);
