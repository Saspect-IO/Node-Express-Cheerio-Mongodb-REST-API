// ..........................................................................
// Imported library
// ..........................................................................
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const randomstring = require("randomstring");
const Config = require('../config/config');
const recaptchConfig = require('../config/common');
const User = require('../models/Users');
// ..........................................................................
// Nodemailer setup
// ..........................................................................
let transporter = nodemailer.createTransport(smtpTransport({
  service: Config.nodeMailer.service,
  host: Config.nodeMailer.host,
  auth: {
    user: Config.nodeMailer.username,
    pass: Config.nodeMailer.pass
  }
}));

// ..........................................................................
// Authentication Login and Registration Pages
// ..........................................................................
//register
module.exports.getRegister = function(req, res) {
  if (req.params.token == Config.token) {
    return res.render('auth/admin-register', {
      title: 'Register',
      webKey:Config.recaptch.siteKey.web,
      localKey:Config.recaptch.siteKey.local,
      messages: req.flash('success'),
      messages_error: req.flash('error')
    });
  }else{
    res.render('errors/error-internal-server', {
      title: 'Error 401 - Not Authorised',
      status:'401',
      msg: 'you are not authorised to access this page, contact site admin',
      backlink:'/geoexpo/registration'
    });
  }
}
//admin login
module.exports.getLogin = function(req, res) {
    return res.render('auth/login', {
      title: 'Login',
      token:Config.token,
      messages: req.flash('success'),
      messages_error: req.flash('error')
    });
}

// ..........................................................................
// Registration and verification process
// ..........................................................................
module.exports.register = async function(req, res) {
  let member = await User.findOne({email:req.body.email});
  if (member) {
    res.render('errors/error-internal-server', {
      title: 'Error 400 -  Bad input',
      status:'400',
      msg: 'This email is already registered, please check email to verify your account or proceed to login',
      backlink:'/login'
    });
  }else{
    let verification_token = randomstring.generate({
      length: 64
    });
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const token = verification_token;
    const password = req.body.password;
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      token:token,
      password:password
    });
    recaptchConfig.verifyRecaptcha(req.body['g-recaptcha-response'], function (success) {
      if (success) {

        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err){
              console.log(err);
            }
            newUser.password = hash;
            newUser.save(function(err){
              if(err){
                console.log(err);
                return;
              } else {
                let link="http://"+req.get('host')+'/verify/'+newUser.token;
                let mailOptions={
                    to : newUser.email,
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                }
                transporter.sendMail(mailOptions, function(error, response){
                  if(error){
                    console.log(error);
                  }else{
                    res.render('auth/email-verify', {
                      messages: req.flash('success'),
                      messages_error: req.flash('error'),
                      title: 'CONFIRM EMAIL',
                      message: 'Please check your email to verify and activate your account',
                      email: newUser.email,
                      backlink:'/login'
                    });
                  }
                });
              }
            });
          });
        });
      } else {
        res.render('errors/error-internal-server', {
          title: 'Error 400 -  Bad input',
          status:'400',
          msg: 'reCaptcha failed. Please Select reCaptcha',
          backlink:'/admin-register/'+Config.token
        });
        return false;
      }
    });
  }
}

module.exports.emailVerify = async function (req, res, next) {
  res.render('/auth/email-verify',{
    messages: req.flash('success'),
    messages_error: req.flash('error')
  });
}
module.exports.verifyUser = async function (req, res, next) {
  let user = await User.findOne({token:req.params.id});
  //console.log(user)

  if (user!=null&&user.confirmed==false) {
    let query = {
      _id:user._id
    }
    let newData = {
      $set:{
        confirmed: true,
        status:'active'
      }
    }
    User.update(query, newData, function (err) {
      if (err){
        throw err;
      }else{
        let link="http://"+req.get('host')+'/login';

        let mailOptions={
          to : user.email,
          subject : "User Confirmation",
          html : "Hello,<br>Your account has been successfully confirmed and activated.<br><a href="+link+">Click here to login</a>"
      }
      transporter.sendMail(mailOptions, function(error, response){
        if(error){
          res.render('errors/error-internal-server', {
            title: 'Error 500 - Internal Server Error',
            status:'500',
            msg: error,
            backlink:'/login'
          });
        }else{
          res.render('auth/email-verify', {
            messages: req.flash('success'),
            messages_error: req.flash('error'),
            title: 'Account Confirmed',
            message: 'Your Account have been successfully confirmed, You may proceed to login',
            email: user.email,
            backlink:'/login'
          });
        }
      });
      }
    });
  }else{
    res.render('errors/error-internal-server', {
      messages: req.flash('success'),
      messages_error: req.flash('error'),
      title: 'Error 400 -  Bad input',
      status:'400',
      msg: 'Your account have already been confirmed, Please proceed to login',
      backlink:'/login'
    });
  }
}
// ..........................................................................
// Login and logout
// ..........................................................................
module.exports.login = async function (req, res, next) {
  let member = await User.findOne({email:req.body.email});
  if (member==null) {
    res.render('errors/error-internal-server', {
      title: 'Error 401 - Unauthorized',
      status:'401',
      msg: 'Email Account does not exist, please register and check email to verify account',
      backlink:'/geoexpo/registration'
    });
  }else{
    if (!member.confirmed || member.status=='inactive') {
      res.render('errors/error-internal-server', {
        title: 'Error 401 - Unauthorized',
        status:'401',
        msg: 'Please check your email to verify and activate your account',
        backlink:'/login'
      });
    }else{

      if (member.role =='consumer') {
        return passport.authenticate('local', {
          successRedirect:'/dashboard',
          failureRedirect:'/login',
          failureFlash: true,
        })(req, res, next)
      }else if (member.role =='super'||member.role =='admin'){
        return passport.authenticate('local', {
          successRedirect:'/admin-dashboard',
          failureRedirect:'/login',
          failureFlash: true,
        })(req, res, next)

      }else{
        res.render('errors/error-internal-server', {
          title: 'Error 401 - Unauthorized',
          status:'401',
          msg: 'Please signup and to access login credentials',
          backlink:'/login'
        });
      }
    }
  }
}
module.exports.logout = function (req, res, next) {

  req.session.save(function () {
    req.logout();
    req.flash('success', 'You are logged out')
    res.redirect('/login');
  });

}


// ..........................................................................
// Password Recovery Section
// ..........................................................................
module.exports.resetForm = function (req, res, next) {
  res.render('auth/reset-password',{
    messages: req.flash('success'),
    messages_error: req.flash('error')
  });
}
//reset password request
module.exports.reset = async function (req, res, next) {
  let user = await User.findOne({email:req.body.email});

  if (!user) {
    res.render('errors/error-internal-server', {
      title: 'Error 400 -  Bad input',
      status:'400',
      msg: 'Sorry this email is not registerd, please enter an email registered with us',
      backlink:'/reset',
    });
  }
  if (user) {
    let link="http://"+req.get('host')+'/reset/password/'+user.token;
    let mailOptions={
        to : user.email,
        subject : "Password Recovery",
        html : "Hello,<br> Please Click on the link to change your password.<br><a href="+link+">Click here</a>"
    }
    transporter.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      }else{
        res.render('auth/email-verify', {
          messages: req.flash('success'),
          messages_error: req.flash('error'),
          title: 'Error 400 -  Bad input',
          status:'400',
          message: 'Please check your email to reset password and access your account',
          email: user.email,
          backlink:'/login'
        });
      }
    });
  }
}
//reset passwoard form
module.exports.resetPasswordForm = async function (req, res, next) {
  let user = await User.findOne({token:req.params.id});

  if (user!=null) {
    res.render('auth/user-reset-password', {
      token:req.params.id,
      messages: req.flash('success'),
      messages_error: req.flash('error')
    });
  }else{
    res.render('errors/error-internal-server', {
      title: 'Error 500 - Internal Server Error',
      status:'500',
      msg: 'Sorry password reset link has expired, please try resending password reset email',
      backlink:'/reset'
    });
  }
}
//reset password
module.exports.resetPassword = async function (req, res, next) {
  let user = await User.findOne({token:req.params.id});

  if (user!=null) {
    let query = {
      _id:user._id
    }
    let verification_token = randomstring.generate({
      length: 64
    });
    let updateUser = {};
    updateUser.name = user.name;
    updateUser.email = user.email;
    updateUser.username = user.username;
    updateUser.role = user.role;
    updateUser.confirmed = user.confirmed;
    updateUser.token = verification_token;

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
        }
        updateUser.password = hash;
        User.update(query, updateUser, function(err) {

          if (err) {
            res.render('errors/error-internal-server', {
              title: 'Error 500 - Internal Server Error',
              status:'500',
              msg: 'Somthing went wrong',
              backlink:'/reset'
            });

          } else {
            req.flash('success','Password Successfully Reset');
            res.redirect('/login')
          }
        });
      });
    });
  }else{
    res.render('errors/error-internal-server', {
      title: 'Error 500 - Internal Server Error',
      status:'500',
      msg: 'Somthing went wrong',
      backlink:'/reset'
    });
  }
}
