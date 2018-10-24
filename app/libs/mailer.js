'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sahil082018@gmail.com',
        pass: 'sahil@999'
    }
});

let sendWelcomeMail = (userDetails) => {

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'sahil082018@gmail.com',
        to: 'shokeennitin1995@gmail.com',
        subject: `${userDetails.firstName}, welcome to your new Meeting Planner Account`,
        html: `<div style="background:whitesmoke;margin:50px;padding:15px;text-align:center"><h1>Hi ${userDetails.firstName}</h1><p>Your account has been created.
        Please login to view your meetings.</p>
        <p><button style="background:none;padding:5px 10px">LOGIN</button></p>
        <p><h4>Here’s what we have on file for you:</h4>
        Name: ${userDetails.firstName} ${userDetails.lastName}<br>Email: ${userDetails.email}<br>Phone: +${userDetails.countryCode} ${userDetails.mobileNumber}</p>
        <p>Yours sincerely<br>Meeting Planner</p>
        </div>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });
}

let sendNotification = (meetingDetails) => {

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'sahil082018@gmail.com',
        to: 'shokeennitin1995@gmail.com',
        subject: `Notification: ${meetingDetails.title} @ ${meetingDetails.time.start}`,
        html: `<div style="border:2px solid lightgrey;padding:15px"><h2>${meetingDetails.title}</h2>
        <table>
        <tr><td style="color:grey">When</td><td>${meetingDetails.time.start}</td></tr>
        <tr><td style="color:grey">Where</td><td>${meetingDetails.location}</td></tr>
        <tr><td style="color:grey">Who</td><td>${meetingDetails.invitees}</td></tr>
        <tr><td style="color:grey">Notes</td><td>${meetingDetails.notes}</td></tr>
        </table>
        <p><button style="background:lightgrey;padding:5px 10px;border:none;border-radius:3px">More details</button></p>
        <hr><h5>Sent by Meeting Planner</h5>
        </div>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });
}

let sendNewMeetingMail = (meetingDetails) => {
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'sahil082018@gmail.com',
        to: 'shokeennitin1995@gmail.com',
        subject: `New Meeting: ${meetingDetails.title} @ ${meetingDetails.time.start}`,
        html: `Hi! You have a invitation for a new meeting.<br>
        <div style="border:2px solid lightgrey;padding:15px"><h2>${meetingDetails.title}</h2>
        <table>
        <tr><td style="color:grey">When</td><td>${meetingDetails.time.start}</td></tr>
        <tr><td style="color:grey">Where</td><td>${meetingDetails.location}</td></tr>
        <tr><td style="color:grey">Who</td><td>${meetingDetails.invitees}</td></tr>
        <tr><td style="color:grey">Notes</td><td>${meetingDetails.notes}</td></tr>
        </table>
        <p><button style="background:lightgrey;padding:5px 10px;border:none;border-radius:3px">More details</button></p>
        <hr><h5>Sent by Meeting Planner</h5>
        </div>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });
}//end sendNewMeetingMail

let sendMeetingUpdateMail = (meetingDetails) => {
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'sahil082018@gmail.com',
        to: 'shokeennitin1995@gmail.com',
        subject: `Meeting Updated: ${meetingDetails.title} @ ${meetingDetails.time.start}`,
        html: `Hi! This meeting has been updated by the cretor. Find updated details below.<br>
        <div style="border:2px solid lightgrey;padding:15px"><h2>${meetingDetails.title}</h2>
        <table>
        <tr><td style="color:grey">When</td><td>${meetingDetails.time.start}</td></tr>
        <tr><td style="color:grey">Where</td><td>${meetingDetails.location}</td></tr>
        <tr><td style="color:grey">Who</td><td>${meetingDetails.invitees}</td></tr>
        <tr><td style="color:grey">Notes</td><td>${meetingDetails.notes}</td></tr>
        </table>
        <p><button style="background:lightgrey;padding:5px 10px;border:none;border-radius:3px">More details</button></p>
        <hr><h5>Sent by Meeting Planner</h5>
        </div>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });
}//end sendNewMeetingMail


let sendForgotPasswordEmail = (email,token) => {
  
    let mailOptions = {
        from: 'sahil082018@gmail.com',
        to: 'shokeennitin1995@gmail.com',
        subject: `Reset your password`,
        html: ` <h3>Hi!</h3>
        <p>You requested for a password reset, kindly use this <a href="http://localhost:3000/resetPassword?token=${token}">link</a> to reset your password</p>
        <p>This link is valid for 30 minutes.</p>
        <br>
        <p>Cheers!</p>`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });
}//end sendNewMeetingMail


module.exports = {
    sendWelcomeMail: sendWelcomeMail,
    sendNotification: sendNotification,
    sendNewMeetingMail: sendNewMeetingMail,
    sendMeetingUpdateMail: sendMeetingUpdateMail,
    sendForgotPasswordEmail: sendForgotPasswordEmail
}


