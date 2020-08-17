const express = require('express')
require('./db/mongoose.js')
const taskRouter = require('../src/routers/taskRouter')
const userRouter = require('../src/routers/userRouter')

const app = express()

//removing  || portnumber and use PORT envirment variable to access the portnumber
const port = process.env.PORT 

//if you declare your middleware right here it should be run for every request 

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     res.status(503).send('we cant handle any requset please try later')
// })

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log('express is up and running on port ' + port)
})