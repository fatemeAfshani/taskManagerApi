const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.API_KEY)



const welcomeEmail = (email, name) => { 
    sgMail.send({
        to: email,
        from: 'fatemehkhanom7825@gmail.com',
        subject: 'for test',
        text: `this is my text for ${name} welcome`
    })
}

const goodByeEmail = (email, name) => { 
    sgMail.send({
        to: email,
        from: 'fatemehkhanom7825@gmail.com',
        subject: 'for test',
        text: `this is my text for ${name} dont go please`
    })
}

module.exports = {
    welcomeEmail,
    goodByeEmail
}