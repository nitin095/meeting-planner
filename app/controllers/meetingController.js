const mongoose = require('mongoose');
const shortid = require('shortid');
var schedule = require('node-schedule');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
const mailer = require('./../libs/mailer')

/* Models */
const MeetingModel = mongoose.model('Meeting')

/* Get single meeing details */
let getMeeting = (req, res) => {
    MeetingModel.findOne({ 'meetingId': req.params.meetingId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeeting', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Meeting Controller:getMeeting')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Meeting Details Found', 200, result);
                res.send(apiResponse)
            }
        })
}// end get single user

let getAllMeetings = (req, res) => {
    MeetingModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getAllMeetings', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Meeting Controller: getAllMeetings')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all blogs


/**
 * function to read all meetings by year.
 */
let getMeetingsByYear = (req, res) => {
    MeetingModel.find({ "time.start": { "$gte": new Date(req.params.year, 0, 1), "$lt": new Date(req.params.year, 11, 30) } })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeetingsByYear', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Meeting Controller: getMeetingsByYear')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all meetings by year


/**
 * function to read all meetings by month.
 */
let getMeetingsByMonth = (req, res) => {
    MeetingModel.find({ "time.start": { "$gte": new Date(req.params.year, req.params.month, 1), "$lt": new Date(req.params.year, req.params.month, 31) } })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeetingsByMonth', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Meeting Controller: getMeetingsByMonth')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all meetings by month


/**
 * function to read all meetings by month.
 */
let getMeetingsByDate = (req, res) => {
    MeetingModel.find({ "time.start": { "$gte": new Date(req.params.year, req.params.month, req.params.day), "$lt": new Date(req.params.year, req.params.month, req.params.day + 1) } })
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Meeting Controller: getMeetingsByDate', 10)
                let apiResponse = response.generate(true, 'Failed To Find Meeting Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Meeting Found', 'Meeting Controller: getMeetingsByDate')
                let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Meeting Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all meetings by month


/**
 * function to create q meeting.
 */
let createMeeting = (req, res) => {
    let newMeeting = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.title) || check.isEmpty(req.body.startTime)) {
                console.log("403, forbidden request");
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
                let meetingId = shortid.generate()
                let newMeeting = new MeetingModel({
                    meetingId: meetingId,
                    title: req.body.title,
                    notes: req.body.notes,
                    time: { start: req.body.startTime, end: req.body.endTime },
                    location: req.body.location
                }) // end new blog model

                let alerts = [];
                let emailAlerts = (req.body.emailAlerts != undefined && req.body.emailAlerts != null && req.body.emailAlerts != '') ? req.body.emailAlerts.split(',') : [];
                let notificationAlerts = (req.body.notificationAlerts != undefined && req.body.notificationAlerts != null && req.body.notificationAlerts != '') ? req.body.notificationAlerts.split(',') : [];

                for (let alert of emailAlerts) {
                    alerts.push({ alertType: 'email', minutes: alert })
                }
                for (let alert of notificationAlerts) {
                    alerts.push({ alertType: 'notification', minutes: alert })
                }

                newMeeting.alerts = alerts;

                let invitees = (req.body.invitees != undefined && req.body.invitees != null && req.body.invitees != '') ? req.body.invitees.split(',') : [];
                newMeeting.invitees = invitees;

                newMeeting.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('Success in meeting creation')
                        resolve(result)
                    }
                }) // end new blog save
            }
        }) // end new blog promise
    } // end create blog function

    // making promise call.
    newMeeting()
        .then((result) => {
            let apiResponse = response.generate(false, 'Meeting Created successfully', 200, result);
            res.send(apiResponse);
            schedule.scheduleJob(time.getTimeAfter(0.5), function(){
                mailer.sendNewMeetingMail(result)
            });
            for (let alert of result.alerts) {
                if (alert.alertType == 'email') {
                    console.log(`Email alert set: ${alert.minutes} minutes before.`);
                    schedule.scheduleJob(time.getTimeBefore(result.time.start,alert.minutes), function () {
                        mailer.sendNotification(result)
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}

let editMeeting = (req, res) => {

    let options = req.body;
    MeetingModel.update({ 'meetingId': req.params.meetingId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Meeting Controller:editMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To edit Meeting details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Meeting Found', 'Meeting Controller: editMeeting')
            let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Meeting details edited', 200, result)
            res.send(apiResponse);
            schedule.scheduleJob(time.getTimeAfter(1), function(){
                mailer.sendMeetingUpdateMail(result)
            });
        }
    });// end user model update


}// end edit user



let deleteMeeting = (req, res) => {

    MeetingModel.findOneAndRemove({ 'meetingId': req.params.meetingId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'meeting Controller: deleteMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'meeting Controller: deleteMeeting')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the meeting successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user


module.exports = {

    getMeeting: getMeeting,
    getAllMeetings: getAllMeetings,
    getMeetingsByYear: getMeetingsByYear,
    getMeetingsByMonth: getMeetingsByMonth,
    getMeetingsByDate: getMeetingsByDate,
    createMeeting: createMeeting,
    editMeeting: editMeeting,
    deleteMeeting: deleteMeeting

}// end exports