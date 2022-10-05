const mongoose = require('mongoose');
const idPlugin = require('mongoose-id');

const reservationSchema = mongoose.Schema({
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    trainerName: {
        type: String,
        required:true
    },
    date: {
        type : Date,
        required: true,
    },
    owner: {
        type : String,
    },
    place: {
        type : String,
        required: true,
    },
    duration : {
        type : Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type : String,
        enum: ['pending', 'accepted', 'rejected', 'archived'],
        default: 'pending'
    }
})

reservationSchema.plugin(idPlugin);

module.exports = mongoose.model('Reservations', reservationSchema);
