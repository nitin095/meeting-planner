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
    creator: String,
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
    alerts: [
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
    invitees: [],
    meetingColor: {
        type: String,
        default: 'purple'
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    }

})

mongoose.model('Meeting', meetingSchema);