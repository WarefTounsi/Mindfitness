const mongoose = require("mongoose");

let idPlugin = require("mongoose-id");


const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        conversation:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Conversation"
        }
    },
    {
        timestamps: true,
    }
);

messageSchema.pre(/^find/, function (next) {
    this.select("-__v").populate('createdBy');
    next();
});

messageSchema.plugin(idPlugin)

module.exports = mongoose.model("Message", messageSchema);
