const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require("../models/User")
const auth = require("../middleware/auth")


const router = express.Router()

//create user
router.post('/users', async (req,res) =>{
    const user = new User(req.body)

    // user.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((error) => {
    //     res.status(400).send(error)
        
    // })
    try{
        await user.save()
        const token = await user.createtoken()
        res.status(201).send({user, token})
    }catch (e){
        res.status(400).send(e)
    }
  
  
})

router.post('/users/login' , async (req,res) => {
    try{
        const user =  await User.findUserByData(req.body.email, req.body.password)
        const token = await user.createtoken()        
        res.send({user, token})
    }catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth , async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token !== req.token 
        })
    
        await req.user.save()
        res.send()
    }catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth , async(req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(E){
        res.status(500).send()
    }
})


router.get('/users/me',auth ,async (req,res) => {
   res.send(req.user)
})

// we already doing it in above
// router.get('/users/:id', async (req,res) => {
//     const _id = req.params.id
   
//     try{
//         const user =  await User.findById(_id)
//         if(!user){
//            return res.status(404).send()
//         }
//         res.send(user)

//     }catch(e){
//         res.status(500).send()
//     }

// })

router.patch('/users/me',auth , async (req,res) => {
    const updates = Object.keys(req.body)
    const shouldupdate = ['name','email','password','age']
    const isvalidtoupdate = updates.every((update) => {
       return shouldupdate.includes(update)
    })
    if(!isvalidtoupdate){
        res.status(400).send('invalid update')
    }

    try{
        //change it to manually save so we can use our pre function on save
        //const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

       //const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true, useFindAndModify: false})
       //because we use auth middleware so below condition never happens
    //    if(!user){
    //        return res.status(404).send()
    //    }
       res.send(req.user)        
    }catch(e) {
       res.status(500).send()
    }
})


router.delete("/users/me" ,auth, async (req,res)=> {

    try{
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user){
        //    return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

const avatar = multer({
    // dest : 'avatars',
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb){

        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please send an image'))
        }
        cb(undefined, true)
    }
})

//the second callback is a error handler
//we use sharp to make all of our pages in the same size and format
router.post('/users/me/avatar' ,auth,  avatar.single('avatar') , async (req,res) => {
    //this will work if we install sharp :/
    const bufferedimg = await sharp(req.file.buffer).resize({height: 250, width:250}).png().toBuffer()
    
    req.user.avatar = bufferedimg
    await req.user.save()

    res.send()
}, (error,req, res , next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async(req,res) => {
    req.user.avatar = undefined
    await req.user.save()

    res.send()
})

router.get('/users/:id/avatar',async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error('not found')
    }

    res.set('Content_Type','image/png')
    res.send(user.avatar)

    }catch(e){
        res.status(404).send({error: e.message})
    }
})

module.exports = router