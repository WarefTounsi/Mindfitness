const mongoose = require('mongoose');
let idPlugin = require('mongoose-id');

const trainingSchema = mongoose.Schema(
    {
        title: {
            type:String,
            lowercase: false,
            trim: true,
            required: true,
            minLength: 10,
            maxLength: 100
        },
        subTitle: {
            type:String,
            trim: true,
            required: true,
            minLength: 10,
            maxLength: 500
        },
        category: {
            type: String,
            enum: ['WEB Developpment', 'Cloud Computing', 'Mobile Development', 'Machine Learning', 'Deep Learning'],
            required:true 
        },
        description: {
            type: String,
            required: true
        },
        note: {
            type: Number,
            defaultValue: 0
        },
        price: {
            type: Number,
            required: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: false
        },
        image: {
            type: String,
            trim: true
        },
        video: {
            type: String,
            trim:true
        },
        tags: [String],
        prerequisites: [String],
        addedValue: [String],
        avis: [String],
        content: [{chapterTitle: String, chapterDescription: String, file: String }]
    },
    {timestamps : {createdAt: "created_at"}}

);
trainingSchema.plugin(idPlugin)
module.exports = mongoose.model('Training', trainingSchema);