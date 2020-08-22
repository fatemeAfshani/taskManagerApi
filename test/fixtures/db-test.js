const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/User')
const Task = require('../../src/models/Task')

const userId = new mongoose.Types.ObjectId()

const userone = {
    _id: userId ,
    name: 'jenifer',
    email: 'jenifer@gmail.com',
    password: 'jenifer1234#',
    tokens: [{
        token: jwt.sign({ _id : userId }, process.env.SECRET_JWT)
    }]
}


const userId2 = new mongoose.Types.ObjectId()

const usertwo = {
    _id: userId2 ,
    name: 'melina',
    email: 'melina@gmail.com',
    password: 'melina1234#',
    tokens: [{
        token: jwt.sign({ _id : userId2 }, process.env.SECRET_JWT)
    }]
}

const taskone = {
    _id: new mongoose.Types.ObjectId,
    description: 'tasknumber one',
    complited: true,
    owner: userone._id
}

const tasktwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'tasknumber two',
    complited: false,
    owner: userone._id
}

const taskthree = {
    _id: new mongoose.Types.ObjectId,
    description: 'tasknumber three',
    complited: true,
    owner: usertwo._id
}

const saveTestUser = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userone).save()
    await new User(usertwo).save()
    await new Task(taskone).save()
    await new Task(tasktwo).save()
    await new Task(taskthree).save()

}


module.exports = {
    userId,
    userone,
    saveTestUser,
    usertwo,
    taskone
}