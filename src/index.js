const app = require('./app')

//removing  || portnumber and use PORT envirment variable to access the portnumber
const port = process.env.PORT 


app.listen(port, () => {
    console.log('express is up and running on port ' + port)
})