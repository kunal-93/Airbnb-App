const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

// referred from  - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const userAuthentication = (req, res) => {
    const errors = {}

    userModel.findOne({Email: req.body.email})
    .then(user => {
        if(user == null){
            errors.authenticationErrors = "Email and/or password does not match";
            res.render('general/login', {
                errorMessages: errors
            });
        }
        else{
            bcrypt.compare(req.body.password, user.Password)
            .then(isMatched => {
                if(isMatched){
                    req.session.userInfo = user;
                    const redirectTo = req.session.redirectTo || '/user/dashboard';
                    delete req.session.redirectTo
                    res.redirect(redirectTo);
                }
                else{
                    errors.authenticationErrors = "Email and/or password does not match"
                    res.render('general/login', {
                        errorMessages: errors
                    });
                }
            })
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
}

function loginValidation(req, res){

    const errors = {};

    if(req.body.email == ""){
        errors.invalidMail = "Email cannot be empty";
    }
    else if(!validateEmail(req.body.email)){
        errors.invalidMail = "Invalid Email";
    }

    if(req.body.password == ""){
        errors.invalidPassword = "password cannot be empty";
    }

    if(Object.keys(errors).length > 0){
        res.render("general/login", {
            errorMessages : errors,
            userData: req.body
        });
    }
    else{
        userAuthentication(req, res);
    }
}

module.exports.loginValidation = loginValidation;