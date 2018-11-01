// Dependencies
const express = require('express');
const router = express.Router();
const adminController = require("./../../app/controllers/adminController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/admin`;

    app.get(`${baseUrl}/view/all`, auth.isAuthorized, adminController.getAllAdmin);

      /**
	 * @api {get} /api/v1/admin/view/all Get all admins
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Admin Details Found",
	    "status": 200,
	    "data": [
					{
						adminId: "string",
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
	    "message": "Failed To Find Admin Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(`${baseUrl}/:adminId/details`, auth.isAuthorized, adminController.getSingleAdmin);

    /**
	 * @api {get} /api/v1/admin/:adminId/details Get a single admin
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} adminId The adminId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Admin Found Successfully.",
	    "status": 200,
	    "data": {
            adminId: "string",
            firstName: "string",
            lastName: "string",
            email: "mstring",
            countryCode: number,
            mobileNumber: number,
            createdOn: "Date",
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


    app.post(`${baseUrl}/signup`, adminController.signUpFunction);

     /**
	 * @api {post} /api/v1/admin/signup Signup admin
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} firstName First name of the admin passed as the body parameter
     * @apiParam {String} lastName LastName of the admin passed as the body parameter
     * @apiParam {Number} countryCode Country code of the admin passed as the body parameter
     * @apiParam {Number} mobileNumber Mobile number of the admin passed as the body parameter
     * @apiParam {String} email Email of the admin passed as the body parameter
     * @apiParam {String} password Password of the admin passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Admin Created Successfully",
	    "status": 200,
	    "data": []
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


    app.post(`${baseUrl}/login`, adminController.loginFunction);

    /**
	 * @api {post} /api/v1/admin/login Login admin
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} email Email of the admin passed as the body parameter
     * @apiParam {String} password Password of the admin passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false, 
            message: "Login Successful", 
            status: 200,
            data: {
                authToken: "String"
                error: false
                message: "Login Successful"
                status: 200
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


    app.put(`${baseUrl}/:adminId/edit`, auth.isAuthorized, adminController.editAdmin);

    /**
	 * @api {put} /api/v1/blogs/:adminId/edit Edit admin by adminId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} adminId adminId of the admin passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Admin Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						adminId: "string",
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


    app.post(`${baseUrl}/:adminId/delete`, auth.isAuthorized, adminController.deleteAdmin);

     /**
	 * @api {post} /api/v1/admin/delete Delete admin by adminId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} adminId adminId of the admin passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Admin Deleted Successfully",
	    "status": 200,
	    "data": []
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


    app.post(`${baseUrl}/logout`, auth.isAuthorized, adminController.logout);

    /**
    * @api {post} /api/v1/admin/logout Logout admin by authToken
    * @apiVersion 0.0.1
    * @apiGroup delete
    *
    * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
    * 
    *  @apiSuccessExample {json} Success-Response:
    *  {
           error: false, 
           message: "Logged Out Successfully", 
           status: 200, 
           data: null
       }
    
     @apiErrorExample {json} Error-Response:
    *
    * {
           error: true, 
           message: "Invalid Or Expired AuthorizationKey", 
           status: 404, 
           data: null
   }
    */

}
// end module.exports.setRouter
