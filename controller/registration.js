// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const registration = {

    sendMessage(name, res){

    client.messages
    .create({
        body: `Hi ${name}, Welcome to AirBnB`,
        from: '+19729967038',
        to: '+16479983500'
    })
    .then(()=>{
        res.redirect("/dashboard")
    })
    .catch((err) => {
        //console.log(`Error while sending Message: ${err}`);
    });
        
    },

    sendEmail(name, email, res){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: `${email}`,
        from: 'kunaldhawan0212@gmail.com',
        subject: `Welcome ${name} - new user`,
        html: `
        <strong>Welcome ${name}</strong>
        <p>Thanks for registering on AirBnb. We wish you a great travelling experience.</p>
        `,
        };
        
        sgMail.send(msg)
        .then(() => {
            res.redirect("/dashboard")
        })
        .catch((err) => {
            //console.log(`Error while sending email: ${err}`);
        });
    },

    // Validation Logic

    // referred from  - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

    validateEmail(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    validateName(name){
        const re = /[a-zA-z]$/;
        return re.test(name);
    },

    userValidation(req, res){

        const errors = {};

        if(req.body.email == ""){
            errors.invalidMail = "Email cannot be empty";
        }
        else if(!this.validateEmail(req.body.email)){
            errors.invalidMail = "Invalid Email address";
        }
        if(req.body.firstName == ""){
            errors.invalidFirstName = "First Name cannot be empty";
        }
        else if(!this.validateName(req.body.firstName)){
            errors.invalidFirstName = "First Name can only have alphabets"
        }

        if(req.body.lastName == ""){
            errors.invalidLastName = "Last Name cannot be empty";
        }
        else if(!this.validateName(req.body.lastName)){
            errors.invalidLastName = "Last Name can only have alphabets"
        }

        if(req.body.phoneNo.length != 10){
            errors.invalidPhoneNo = "Phone number should be of 10 digits";
        }

        if(req.body.password == ""){
            errors.invalidPassword = "Password cannot be empty";
        }

        if(!req.body.password.match(/^[a-zA-z0-9]{8,}$/)){
            errors.invalidPassword = "Password length should be atleast 8 and Password cannot contain special characters";
        }

        if(req.body.password != req.body.verifyPassword || req.body.verifyPassword == ""){
            errors.passwordsDontMatch = "Passwords do not match";
        }

        if(Object.keys(errors).length > 0){
            res.render("general/registration", {
                errorMessages : errors,
                userData: req.body
            });
        }
        else{
            this.sendEmail(req.body.firstName, req.body.email, res);
            this.sendMessage(req.body.firstName, res);
        }
    }
}

module.exports = registration;