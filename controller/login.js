// referred from  - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
        res.render("general/dashboard");
    }
}

module.exports.loginValidation = loginValidation;