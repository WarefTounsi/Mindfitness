const mongoose = require("mongoose");
const idPlugin = require("mongoose-id");
const config = require("../config/config.js");

const purchaseSchema = mongoose.Schema({
     purchase: { type: mongoose.Schema.Types.ObjectId, required: true },
     owner: {
          type: String,
          required: true,
     },
});

purchaseSchema.plugin(idPlugin);
module.exports = mongoose.model("Purchase", purchaseSchema);
