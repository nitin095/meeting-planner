// Dependencies
const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;

    app.get(`${baseUrl}/:meetingId/details`,meetingController.getMeeting);

    app.get(`${baseUrl}/year/:year`,meetingController.getMeetingsByYear);

    app.get(`${baseUrl}/month/:month/:year`,meetingController.getMeetingsByYear);

    app.get(`${baseUrl}/date/:day/:month/:year`,meetingController.getMeetingsByDate);

    app.get(`${baseUrl}/all`,meetingController.getAllMeetings);

    app.get(`${baseUrl}/all/admin`, meetingController.getAllMeetingsByAdmin);

    app.post(`${baseUrl}/create`,meetingController.createMeeting);

    app.get(`${baseUrl}/delete/:meetingId`,meetingController.deleteMeeting);

    app.put(`${baseUrl}/edit/:meetingId`,meetingController.editMeeting)

}
// end module.exports.setRouter
