const express = require('express');
const router = express.Router();
const adminController = require("./../../app/controllers/adminController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/admin`;

    app.get(`${baseUrl}/view/all`, auth.isAuthorized, adminController.getAllAdmin);

    app.get(`${baseUrl}/:userId/details`, auth.isAuthorized, adminController.getSingleAdmin);

    app.post(`${baseUrl}/signup`, adminController.signUpFunction);

    app.post(`${baseUrl}/login`, adminController.loginFunction);

    app.put(`${baseUrl}/:userId/edit`, auth.isAuthorized, adminController.editAdmin);

    app.post(`${baseUrl}/:userId/delete`, auth.isAuthorized, adminController.deleteAdmin);
    
    app.post(`${baseUrl}/logout`, auth.isAuthorized, adminController.logout);

    app.get(`${baseUrl}/auths`,adminController.getAllAuth);

}
