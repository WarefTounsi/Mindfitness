const mongoose = require("mongoose");
let idPlugin = require("mongoose-id");


const conversationSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        with: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);


conversationSchema.plugin(idPlugin)

conversationSchema.pre(/^find/, function (next) {
    this.select("-__v").populate('createdBy lastMessage with');
    next();
});


module.exports = mongoose.model("Conversation", conversationSchema);
