const app = require('../src/app')
const request = require('supertest')
const Task = require('../src/models/Task')
const {userId, userone, saveTestUser, usertwo , taskone}  = require('./fixtures/db-test')

beforeEach(saveTestUser)

//for unable conflicts between two tests (users and tasks) because they use the same data we add --runInBand in test script in package.json

test('should add new task for a user', async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${userone.tokens[0].token}`)
    .send({
        description: 'this is a test task'
    }).expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.complited).toEqual(false)

})

test('get back all users tasks', async() => {
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${userone.tokens[0].token}`)
    .send().expect(200)

   expect(response.body.length).toBe(2)
   
})


test('should not delete a task for another user', async() => {
    await request(app).delete(`/tasks/${taskone._id}`)
    .set('Authorization', `Bearer ${usertwo.tokens[0].token}`)
    .send().expect(404)
 
    const task = await Task.findById(taskone._id)
    expect(task).not.toBeNull()
 })