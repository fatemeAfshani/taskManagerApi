// the purpose of creating this file is for using it in test file and use express app without really running it(listen is removed from this file)

const express = require('express')
require('./db/mongoose.js')
const taskRouter = require('../src/routers/taskRouter')
const userRouter = require('../src/routers/userRouter')
const path = require('path')
const hbs = require('hbs')

const app = express()

//if you declare your middleware right here it should be run for every request 

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     res.status(503).send('we cant handle any requset please try later')
// })

//define pathes
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//hbs configs
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.use(express.json())
app.use(taskRouter)
app.use(userRouter)

// app.get('', (req, res) => {
//     res.render('index.html')
// })



module.exports = app