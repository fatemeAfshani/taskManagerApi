// const mongodb = require('mongodb')
// const mongodbClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient : mongodbClient , ObjectID} = require('mongodb')

const databaseurl = 'mongodb://127.0.0.1:27017'
const databasename = 'task-manager'

const id =  new ObjectID()
console.log(id)
console.log(id.getTimestamp())

mongodbClient.connect(databaseurl , { useNewUrlParser : true, useUnifiedTopology: true  } , (error, client) => {
    if(error) {
        return console.log('unable to connect to database')
    }
    
    const db = client.db(databasename)

    // db.collection('users').insertOne({
    //     _id : id,
    //     name: 'zahra',
    //     age: 16
    // }, (error, result) => {
    //     if(error){
    //         return console.log('unable to add ducument ')
    //     }
    //     console.log(result.ops)
    // })

        //how to add data to database

        
        // db.collection('users').insertMany([{
        //     name: 'leila',
        //     age: 48
        // },{
        //     name: 'zahra',
        //     age: 21
        // }], (error, result ) => {
        //     if(error){
        //         return console.log('unable to add documents')
        //     }
        //     console.log(result.ops)
        // })

       
        // db.collection('tasks').insertMany([{
        //     description: ' task1',
        //     complited : true
        // }, {
        //     description: 'task 2',
        //     complited: false
        // }, {
        //     description: 'task 3',
        //     complited: true
        // }], (error, result) => {
        //     if(error){
        //         return console.log('unable to add documents')
        //     }
        //     console.log(result.ops)
        // })

        //how to read data from database
    //     db.collection('users').findOne({ _id : new ObjectID("5f300a93e478410410c8cb6a") }, (error, user) => {
    //         if(error){
    //             return console.log('unable to fetch data')
    //         }
    //         console.log(user)
    //     })

   

    //  db.collection('tasks').find({complited : true }).toArray( (error, tasks) =>{
    //         if(error){
    //             return console.log('not able to fetch')
    //         }
    //         console.log(tasks)
    //  })

    //how to update data 
    // db.collection('users').updateOne({ 
    //     _id: new ObjectID("5f30156b9fb42f13443adb3f")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then( (result) =>{
    //     console.log(result)
    // }).catch( (error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({complited: true},{
    //     $set: {
    //         complited: false
    //     }
    // }).then( (result) => {
    //     console.log(result)
    // }).catch( (error) =>{
    //     console.log(error)
    // })

    //how to delete data 
    db.collection('tasks').deleteOne( { 
        description: ' task1'}).then( (result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

    
    })
