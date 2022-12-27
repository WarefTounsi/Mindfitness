const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config.js");
let idPlugin = require("mongoose-id");

const userSchema = mongoose.Schema(
     {
          firstName: {
               type: String,
               required: false,
               lowercase: false,
               trim: true,
               default: ""
          },
          lastName: {
               type: String,
               required: false,
               lowercase: false,
               trim: true,
               default: ""
          },
          email: {
               type: String,
               lowercase: true,
               trim: true,
               unique: true,
               required: true,
          },
          password: {
               type: String,
               required: true,
          },
          role: {
               type: [Number],
          },
          purchases: [mongoose.Schema.Types.ObjectId]
     },
     { timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
     authenticate: function (password) {
          return passwordHash.verify(password, this.password);
     },
     getToken: function () {
          return jwt.encode(this, process.env.JWT_SECRET);
     },
};

userSchema.plugin(idPlugin);

module.exports = mongoose.model("User", userSchema);
