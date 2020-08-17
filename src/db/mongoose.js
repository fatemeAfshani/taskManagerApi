const mongoose = require('mongoose')

mongoose.connect(process.env.DB_PATH , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})



// const me = new User({
// name: '    fateme afshani   ',
// email: '        fati@EMAIL.COM',
// password : "345"})
// me.save().then( (result) => {
//     console.log(result)
// }).catch( (error)=> {
//     console.log(error)
// })


// const task = new Task({complited: true})

// task.save().then( (result) => {
//     console.log(result)
// }).catch( (error) => {
//     console.log(error)
// })