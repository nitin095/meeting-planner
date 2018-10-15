const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/generatePasswordLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')

/* Models */
const adminModel = mongoose.model('Admin')


/* Get all admin Details */
let getAllAdmin = (req, res) => {
    adminModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Admin Controller: getAllAdmin', 10)
                let apiResponse = response.generate(true, 'Failed To Find Admin Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Admin Found', 'Admin Controller: getAllAdmin')
                let apiResponse = response.generate(true, 'No Admin Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Admin Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all admins

/* Get single admin details */
let getSingleAdmin = (req, res) => {
    adminModel.findOne({ 'adminId': req.params.adminId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Admin Controller: getSingleAdmin', 10)
                let apiResponse = response.generate(true, 'Failed To Find Admin Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Admin Found', 'Admin Controller:getSingleAdmin')
                let apiResponse = response.generate(true, 'No Admin Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Admin Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single admin



let deleteAdmin = (req, res) => {

    adminModel.findOneAndRemove({ 'adminId': req.params.adminId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Admin Controller: deleteAdmin', 10)
            let apiResponse = response.generate(true, 'Failed To delete admin', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No admin Found', 'Admin Controller: deleteAdmin')
            let apiResponse = response.generate(true, 'No admin Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the admin successfully', 200, result)
            res.send(apiResponse)
        }
    });// end user model find and remove


}// end delete user

let editAdmin = (req, res) => {

    let options = req.body;
    adminModel.update({ 'adminId': req.params.adminId }, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Admin Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit Admin details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Admin Found', 'Admin Controller: editUser')
            let apiResponse = response.generate(true, 'No Admin Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Admin details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update


}// end edit user


// start user signup function 

let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!validateInput.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'Email Does not met the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.password)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createAdmin = () => {
        return new Promise((resolve, reject) => {
            adminModel.findOne({ email: req.body.email })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'adminController: createAdmin', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Admin', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        let newAdmin = new UserModel({
                            adminId: shortid.generate(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName || '',
                            email: req.body.email.toLowerCase(),
                            mobileNumber: req.body.mobileNumber,
                            password: passwordLib.hashpassword(req.body.password),
                            createdOn: time.now()
                        })
                        newAdmin.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'adminController: createAdmin', 10)
                                let apiResponse = response.generate(true, 'Failed to create new admin', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('Admin Cannot Be Created.Admin Already Present', 'adminController: createAdmin', 4)
                        let apiResponse = response.generate(true, 'Admin Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create user function


    validateUserInput(req, res)
        .then(createAdmin)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'Admin created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findAdmin = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log(req.body);
                adminModel.findOne({ email: req.body.email}, (err, adminDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve Admin Data', 'adminController: findAdmin()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(adminDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No admin Found', 'adminController: findAdmin()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('Admin Found', 'adminController: findAdmin()', 10)
                        resolve(adminDetails)
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedAdminDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedAdminDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'adminController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedAdminDetails = retrievedAdminDetails.toObject()
                    delete retrievedAdminDetails.password
                    delete retrievedAdminDetails._id
                    delete retrievedAdminDetails.__v
                    delete retrievedAdminDetails.createdOn
                    delete retrievedAdminDetails.modifiedOn
                    resolve(retrievedAdminDetails)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'adminController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (adminDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            token.generateToken(adminDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = adminDetails.userId
                    tokenDetails.userDetails = adminDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ adminId: tokenDetails.adminId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'adminController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'adminController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'adminController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.adminDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}



// end of the login function 


/**
 * function to logout user.
 * auth params: userId.
 */
let logout = (req, res) => {
  AuthModel.findOneAndRemove({adminId: req.admin.adminId}, (err, result) => {
    if (err) {
        console.log(err)
        logger.error(err.message, 'user Controller: logout', 10)
        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'Already Logged Out or Invalid adminId', 404, null)
        res.send(apiResponse)
    } else {
        let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
        res.send(apiResponse)
    }
  })
} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    getAllAdmin: getAllAdmin,
    editAdmin: editAdmin,
    deleteAdmin: deleteAdmin,
    getSingleAdmin: getSingleAdmin,
    loginFunction: loginFunction,
    logout: logout

}// end exports