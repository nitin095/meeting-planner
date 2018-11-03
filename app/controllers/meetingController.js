//modules dependencies.
const mongoose = require('mongoose');
const shortid = require('shortid');
const schedule = require('node-schedule');
const time = require('./../libs/timeLib');
const socketLib = require('./../libs/socketLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib');
const mailer = require('./../libs/mailer');

// Models
const MeetingModel = mongoose.model('Meeting')
const UserModel = mongoose.model('User')


// Get single meeting 
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

}// end get single meeting


// Get all meetings of a user
let getAllMeetings = (req, res) => {

    MeetingModel.find({ 'invitees': req.query.userId })
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
                let apiResponse = response.generate(false, 'All Meetings Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}// end get all meetings


// Get all meeting details by admin
let getAllMeetingsByAdmin = (req, res) => {
    MeetingModel.find({ 'creator': req.query.adminId })
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
                let apiResponse = response.generate(false, 'All Meetings Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all meetings by admin


// Get all meetings by year.
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


//Get all meetings by month.
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


//Get all meetings by date.
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


//Create a meeting.
let createMeeting = (req, res) => {

    let newMeeting = () => {

        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.title) || check.isEmpty(req.body.startTime)) {
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
                let meetingId = shortid.generate()
                let newMeeting = new MeetingModel({
                    meetingId: meetingId,
                    creator: req.body.creator,
                    title: req.body.title,
                    notes: req.body.notes,
                    time: { start: req.body.startTime, end: req.body.endTime },
                    location: req.body.location,
                    meetingColor: req.body.meetingColor
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
                }) // end newMeeting save
            }// end else
        }) // end new Meeting promise

    } // end newMeeting function

    // promise call
    newMeeting()
        .then((result) => {
            let apiResponse = response.generate(false, 'Meeting Created successfully', 200, result);
            res.send(apiResponse);

            //sending notification to online users
            socketLib.sendAlert(result)

            //sending New Meeting mail to all users after 30 seconds
            schedule.scheduleJob(time.getTimeAfter(0.5), function () {
                for (let userId of result.invitees) {
                    UserModel.findOne({ 'userId': userId })
                        .select('email')
                        .lean()
                        .exec((err, data) => {
                            mailer.sendNewMeetingMail(result, data.email)
                        })
                }//end for
            });

            //Scheduling Alerts 
            for (let alert of result.alerts) {
                if (alert.alertType == 'email') {
                    console.log(`Email alert set: ${alert.minutes} minutes before.`);
                    schedule.scheduleJob(time.getTimeBefore(result.time.start, alert.minutes), function () {
                        for (let userId of result.invitees) {
                            UserModel.findOne({ 'userId': userId })
                                .select('email')
                                .lean()
                                .exec((err, data) => {
                                    mailer.sendNotification(result, data.email)
                                })
                        }//end for
                    });
                } else {
                    console.log(`Notification alert set: ${alert.minutes} minutes before.`);
                    schedule.scheduleJob(time.getTimeBefore(result.time.start, alert.minutes), function () {
                        socketLib.sendAlert(result)
                    });
                }
            }
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })

}//end create meeting


//Edit meeting
let editMeeting = (req, res) => {

    let options = req.body;
    MeetingModel.update({ 'meetingId': req.params.meetingId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Meeting Controller: editMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To edit Meeting details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Meeting Found', 'Meeting Controller: editMeeting')
            let apiResponse = response.generate(true, 'No Meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Meeting details edited', 200, result)
            res.send(apiResponse);
            socketLib.sendAlert(result)
            schedule.scheduleJob(time.getTimeAfter(1), function () {
                for (let userId of result.invitees) {
                    UserModel.findOne({ 'userId': userId })
                        .select('email')
                        .lean()
                        .exec((err, data) => {
                            mailer.sendMeetingUpdateMail(result, data.email)
                        })
                }//end for
            });
        }
    });

}// end edit user


//Delete meeting
let deleteMeeting = (req, res) => {

    MeetingModel.findOneAndRemove({ 'meetingId': req.params.meetingId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'meeting Controller: deleteMeeting', 10)
            let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Meeting Found', 'meeting Controller: deleteMeeting')
            let apiResponse = response.generate(true, 'No meeting Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Meeting deleted successfully', 200, null);
            res.send(apiResponse);
            socketLib.sendAlert(result);
            for (let userId of result.invitees) {
                UserModel.findOne({ 'userId': userId })
                    .select('email')
                    .lean()
                    .exec((err, data) => {
                        mailer.sendMeetingCancelledMail(result, data.email)
                    })
            }//end for
        }
    });

}// end delete meeting


module.exports = {

    getMeeting: getMeeting,
    getAllMeetings: getAllMeetings,
    getAllMeetingsByAdmin: getAllMeetingsByAdmin,
    getMeetingsByYear: getMeetingsByYear,
    getMeetingsByMonth: getMeetingsByMonth,
    getMeetingsByDate: getMeetingsByDate,
    createMeeting: createMeeting,
    editMeeting: editMeeting,
    deleteMeeting: deleteMeeting

}// end exports