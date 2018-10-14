'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema Declaration
let meetingSchema = new Schema({
    meetingId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    title: {
        type: String,
        default: ''
    },
    time: {
        start: {
            type: Date,
            default: ''
        },
        end: {
            type: Date,
            default: ''
        }
    },
    alert: [
        { 
            alertType: String, 
            minutes: Number 
        }
    ],
    location: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    invitees: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: ""
    }

})

mongoose.model('Meeting', meetingSchema);