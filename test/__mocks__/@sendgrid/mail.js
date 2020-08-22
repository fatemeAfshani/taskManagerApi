//this is the file for mocking @sendgrid/mail modules
//this allow us to do override the sendgrid/mail functions and do not send email every time i run my tests
//we should override every function of the module that we used with empty object

module.exports = {
    setApiKey() {

    },
    send() {

    }
}