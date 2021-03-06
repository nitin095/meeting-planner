// Dependencies
const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')


module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get(`${baseUrl}/view/all`, auth.isAuthorized, userController.getAllUser);

    /**
	 * @api {get} /api/v1/users/view/all Get all users
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All User Details Found",
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
	    "message": "Failed To Find User Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, userController.getSingleUser);

    /**
	 * @api {get} /api/v1/users/:userId/details Get a single user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Found Successfully.",
	    "status": 200,
	    "data": {
            userId: "string",
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


    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
	 * @api {post} /api/v1/users/signup Signup user
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} firstName First name of the user passed as the body parameter
     * @apiParam {String} lastName LastName of the user passed as the body parameter
     * @apiParam {Number} countryCode Country code of the user passed as the body parameter
     * @apiParam {Number} mobileNumber Mobile number of the user passed as the body parameter
     * @apiParam {String} email Email of the user passed as the body parameter
     * @apiParam {String} password Password of the user passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Created Successfully",
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


    app.post(`${baseUrl}/login`, userController.loginFunction);

    /**
	 * @api {post} /api/v1/users/login Login user
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
     * @apiParam {String} email Email of the user passed as the body parameter
     * @apiParam {String} password Password of the user passed as the body parameter
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


    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, userController.editUser);

    /**
	 * @api {put} /api/v1/blogs/:userId/edit Edit user by userId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId userId of the user passed as the URL parameter
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


    app.put(`${baseUrl}/forgotPassword`, userController.forgotPassword);

    /**
	 * @api {put} /api/v1/users/forgotPassword Recover password by user email
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} email email of the user passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false, 
            message: "Password change requested", 
            status: 200, 
            data: {
                n: 1
                nModified: 1
                ok: 1
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


    app.put(`${baseUrl}/resetPassword`, userController.resetPassword);

    /**
	 * @api {put} /api/v1/users/resetPassword Reset password by password reset token
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} token password reset token of the user passed as the Query parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
            error: false, 
            message: "Password change sucessfully", 
            status: 200, 
            data: {
                n: 1
                nModified: 1
                ok: 1
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


    app.post(`${baseUrl}/:userId/delete`, auth.isAuthorized, userController.deleteUser);

    /**
	 * @api {post} /api/v1/users/delete Delete user by userId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId userId of the user passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "User Deleted Successfully",
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


    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

    /**
    * @api {post} /api/v1/users/logout Logout user by authToken
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