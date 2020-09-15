const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Task')


const userSchema = new mongoose.Schema( {
    name:{
        type: String,
        required: true,
        trim: true //for removing spaces from begin and end

    }, email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }

    },password: {
        type:String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            
            var contain = value.indexOf("password")
            if(contain > -1){
                throw new Error('should not contain "password"')
            }
        }
   
    },age: {
        type: Number,
        default: 0 ,
        validate(value){
            if(value < 0 ){
                throw new Error('age mush be over 0')
            }
        }

    },tokens: [{
        token:{
            type: String,
            required: true
        }
    }],
    avatar : {
        type: Buffer
    }
}, {
    timestamps: true
})

// create a virtual to connect tasks to a specific user by the owener and _id field
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//unable user to see tokens array and password 
// every time before sending data back to user express convert data to json (JSON.tostringify) so .toJSON 
//is gonna be called by default
userSchema.methods.toJSON = function() {
    const user = this 
    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}


//create new token. we use regular function because we want to use (this) 
userSchema.methods.createtoken = async function() {
    const user = this
    const token =  jwt.sign({_id: user._id.toString()}, process.env.SECRET_JWT)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


//for login
userSchema.statics.findUserByData = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
    
    return user
}

//for hashing the password before saving
userSchema.pre('save', async function(next)  {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})


//remove all the tasks when the user is removed
userSchema.pre('remove', async function(next) {
    const user = this 
    await Task.deleteMany({owner : user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
