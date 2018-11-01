// Dependencies
const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/meetings`;

    app.get(`${baseUrl}/:meetingId/details`, meetingController.getMeeting);

    /**
	 * @api {get} /api/v1/meetings/:meetingId/details Get a single meeting
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} meetingId The meetingId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false,
            message: "Meeting Details Found.",
            status: 200,
            data: {     
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
                }
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(`${baseUrl}/year/:year`, meetingController.getMeetingsByYear);

    /**
	 * @api {get} /api/v1/meetings/year/:year Get meetings by year
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {Number} year The year should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false,
            message: "All Meetings Details Found.",
            status: 200,
            data: {     
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
                }
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */



    app.get(`${baseUrl}/month/:month/:year`, meetingController.getMeetingsByYear);

    /**
	 * @api {get} /api/v1/meetings/month/:month/:year Get all meetings by month
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {Number} month The month should be passed as the URL parameter
     * @apiParam {Number} year The year should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false,
            message: "Meeting Details Found.",
            status: 200,
            data: {     
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
                }
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */



    app.get(`${baseUrl}/date/:day/:month/:year`, meetingController.getMeetingsByDate);


    /**
	 * @api {get} /api/v1/meetings/date/:day/:month/:year Get all meetings by date
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {Number} day The day should be passed as the URL parameter
     * @apiParam {Number} month The month should be passed as the URL parameter
     * @apiParam {Number} year The year should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false,
            message: "Meeting Details Found.",
            status: 200,
            data: {     
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
                }
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */



    app.get(`${baseUrl}/all`, meetingController.getAllMeetings);


    /**
	 * @api {get} /api/v1/meetings/all Get all meetings of a user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId The userId of the user should be passed as the URL parameter
     * 
	 *  @apiSuccessExample {json} Success-Response.
	 *  {
            error: false,
            message: "All Meeting Details Found.",
            status: 200,
            data: {     
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
                }
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(`${baseUrl}/all/admin`, meetingController.getAllMeetingsByAdmin);

    /**
	 * @api {get} /api/v1/meetings/all/admin Get all meeting created by a admin
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} adminId The adminId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false,
            message: "All Meeting Details Found.",
            status: 200,
            data: {     
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
                }
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.post(`${baseUrl}/create`, meetingController.createMeeting);
    
    /**
	 * @api {post} /api/v1/meetings/create Create a meeting
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} title title of the meeting passed as the Body parameter
     * @apiParam {String} notes notes of the meeting passed as the Body parameter
     * @apiParam {Date} startTime startTime of the meeting passed as the Body parameter
     * @apiParam {Date} endTime endTime of the meeting passed as the Body parameter
     * @apiParam {String} location location of the meeting passed as the Body parameter
     * @apiParam {Number[]} emailAlerts emailAlerts of the meeting passed as the Body parameter
     * @apiParam {Number[]} notificationAlerts notificationAlerts of the meeting passed as the Body parameter
     * @apiParam {String[]} invitees invitees of the meeting passed as the Body parameter
     * @apiParam {String} meetingColor meetingColor of the meeting passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false, 
            message: "Meeting Created successfully", 
            status: 200, 
            data: {
                    "creator": "String",
                    "title": "String",
                    "meetingId": "String"
                    "lastModified": "Date",
                    "created": "Date",
                    "meetingColor": "String",
                    "invitees": [Array],
                    "notes": "String",
                    "location": "String",
                    "alerts": [
                        {
                            "alertType": "email",
                            "minutes": Number,
                            "_id": "String"
                        },
                        {
                            "alertType": "notification",
                            "minutes": Number,
                            "_id": "String"
                        }
                    ],
                    "time": {
                            "end": "Date",
                            "start": "Date"
                    }
            }
        }

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(`${baseUrl}/delete/:meetingId`, meetingController.deleteMeeting);

      /**
	 * @api {get} /api/v1/meetings/delete/:meetingId Get all meeting created by a admin
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} meetingId The meetingId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false,
            message: "Meeting Deleted Sucessfully.",
            status: 200,
            data: {}
        }
        
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


    app.put(`${baseUrl}/edit/:meetingId`, meetingController.editMeeting)

     /**
	 * @api {put} /api/v1/meetings/edit/:meetingId Edit meeting by meetingId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title title of the meeting passed as the Body parameter
     * @apiParam {String} notes notes of the meeting passed as the Body parameter
     * @apiParam {Date} startTime startTime of the meeting passed as the Body parameter
     * @apiParam {Date} endTime endTime of the meeting passed as the Body parameter
     * @apiParam {String} location location of the meeting passed as the Body parameter
     * @apiParam {Number[]} emailAlerts emailAlerts of the meeting passed as the Body parameter
     * @apiParam {Number[]} notificationAlerts notificationAlerts of the meeting passed as the Body parameter
     * @apiParam {String[]} invitees invitees of the meeting passed as the Body parameter
     * @apiParam {String} meetingColor meetingColor of the meeting passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						userId: "string",
						firstName: "string",
						lastName: "string",
                        email: "string",
                        countryCode: number,
						moile: number,
						lastModified: "date"
					}
	    		]
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

}
// end module.exports.setRouter
