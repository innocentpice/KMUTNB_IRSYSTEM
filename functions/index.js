'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const app1 = express();
const app2 = express();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const APP_NAME = 'BCOM ENTERPRISE VERSION 0.1';

function sendEmail(email, displayName) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = 'คุณมีงานใหม่เข้ามา';
  mailOptions.html = `
    <p>สวัสดี&nbsp;
    ${displayName || ''}&nbsp;
    คุณมีงานเพิ่มเข้ามาในระบบ&nbsp;
    <a href="https://ajan-o-innocentpice.c9users.io/">
    ${APP_NAME}
    </a>
    </p>
    `;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Account deletion confirmation email sent to:', email);
  });
}

function sendEmailTable(email, displayName, subject, time) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email
  };

  // The user unsubscribed to the newsletter.
  mailOptions.subject = 'แจ้งเตือนตารางการประชุม';
  mailOptions.html = `
    <p>สวัสดี&nbsp;
    ${displayName || ''}&nbsp;
    คุณมีประชุมเรื่อง&nbsp;
    ${subject}
    &nbsp;เวลา&nbsp;
    ${time}
    </p>
    `;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Account deletion confirmation email sent to:', email);
  });
}

app1.get("*", function(req, res){
  const email = req.query.email;
  const displayName = req.query.displayName;
  sendEmail(email,displayName);
  res.send('Email: '+email+', displayName: '+displayName);
});
exports.sendEmail = functions.https.onRequest(app1);

app2.get("*", function(req, res){
  const email = req.query.email;
  const displayName = req.query.displayName;
  const subject = req.query.subject;
  const time = req.query.time;
  sendEmailTable(email,displayName, subject, time);
  res.send('Email: '+email+', displayName: '+displayName+', subject: '+subject+', time:'+time);
});
exports.sendEmailTable = functions.https.onRequest(app2);