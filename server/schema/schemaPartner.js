const mongoose = require('mongoose');
let idPlugin = require('mongoose-id');

const partnerSchema = mongoose.Schema({
        partnerName: {
            type: String,
            required: true,
            trim: true
        },
        picture :{
            type: String,
            required: true,
            trim: true,
        }
})
partnerSchema.plugin(idPlugin)

module.exports = mongoose.model('Partner', partnerSchema);
