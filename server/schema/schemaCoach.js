const mongoose = require("mongoose");
let idPlugin = require("mongoose-id");

const coachSchema = mongoose.Schema({
     firstName: {
          type: String,
          lowercase: true,
          trim: true,
          required: true,
          minLength: 1,
          maxLength: 20,
     },
     lastName: {
          type: String,
          lowercase: true,
          trim: true,
          required: true,
          minLength: 1,
          maxLength: 20,
     },
     email: {
          type: String,
          lowercase: true,
          trim: true,
          required: true,
          maxLength: 30,
     },
     gender: {
          type: String,
          enum: ["Femelle", "Male"],
          trim: true,
          required: true,
     },
     description: {
          type: String,
          lowercase: true,
          trim: true,
          required: true,
          maxLength: 255,
     },
     note: {
          type: Number,
          default: 0,
     },
     phoneNumber: {
          type: Number,
          required: true,
          min: 20000000,
          max: 99999999,
     },
     socialMediaAccounts: {
          type: Object
     },
     skills: [String],
     picture: { src: String, title: String },
     avis: [],
     hourPrice: {
          type: Number,
     },
});

coachSchema.plugin(idPlugin);

module.exports = mongoose.model("Coach", coachSchema);
