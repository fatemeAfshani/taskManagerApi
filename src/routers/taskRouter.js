const express = require('express')
const Task = require('../models/Task')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/tasks', auth ,async (req,res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ... req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


//get all the tasks related to the specific user
// GET /tasks?completed=false
//GET /tasks?limit=10&skip=10 this request shows us the second 10 of the data
//GET /tasks?sortBy=createdAt:asc -1 means desc and 1 means asc
router.get('/tasks',auth ,async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.complited){
        //becauser req.query.complited is a string not a boolean
        match.complited = req.query.complited === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
    }

    try{
        //const tasks = await Task.find({})
        await req.user.populate({
            path : 'tasks',
            match,
            options :{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)

    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth , async (req,res) => {
   
//     Task.findById(_id).then((task) =>{
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e) => {
//         res.status(500).send()
//     })
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id , owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
 })

 
 router.patch('/tasks/:id',auth, async (req,res) => {
     const updates = Object.keys(req.body)
     const shouldupdate = ['description', 'complited']
     const isvalidtoupdate = updates.every((update) => {
         return shouldupdate.includes(update)
     })
     if(!isvalidtoupdate){
         return res.status(400).send('invalid update')
     }

     try{
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true,runValidators: true,useFindAndModify: false}) 
       // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id: req.params.id , owner: req.user._id})

        if(!task){
            return res.status(404).send()
         }

        updates.forEach((update) => {
            return task[update] = req.body[update]
        })

        await task.save()
        
        
        res.send(task)
        }catch(e) {
            res.status(500).send(e)
        }
 })



router.delete('/tasks/:id' ,auth ,async (req,res) =>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id : req.params.id , owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }

        res.send(task)

    }catch(e) {

        res.status(500).send()
    }
})

module.exports = router