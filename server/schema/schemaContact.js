const mongoose = require('mongoose');
let idPlugin = require('mongoose-id');

const contactSchema = mongoose.Schema({
        email: {
            type: String,
            trim: true,
            required: true,
        },
        message: {
            type: String,
            trim: true,
            required: true
        },
        created_at: {
            type: Date,
            default: new Date(),
        }
})
contactSchema.plugin(idPlugin)

module.exports = mongoose.model('contact', contactSchema)