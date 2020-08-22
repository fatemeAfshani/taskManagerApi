const app = require('../src/app')
const request = require('supertest')
const User = require('../src/models/User')
const {userId, userone, saveTestUser}  = require('./fixtures/db-test')

beforeEach(saveTestUser)

test('creating new user', async () =>{
    const response = await request(app).post('/users').send({
        name: 'fateme',
        email:'fateme@gmail.com',
        password: 'fateme1234#'
    }).expect(201)

    //validate response in deffrent ways 
    const myuser =await  User.findById(response.body.user._id)
    expect(myuser).not.toBeNull()

   // another validation for the whole object data
    expect(response.body).toMatchObject({
        user : {
            name: 'fateme',
            email: 'fateme@gmail.com'
        },
        token : myuser.tokens[0].token
    })

    expect(myuser.password).not.toBe('fateme1234#')
    
})

test('login with the user number one', async () => {
    const response = await request(app).post('/users/login').send({
        email: userone.email,
        password: userone.password
    }).expect(200)

    //validate that the token recived is equal to the token that has been saved in the database
    const user = await User.findById(response.body.user._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('login with a non existing user', async () => {
    await request(app).post('/users/login').send({
        email:'heelo.example.com',
        password: 'lsjflsjfsf'
    }).expect(400)
})

test('should show profile with authorized user', async() =>{
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userone.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not show profile with unauthorized user ', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete the authorized user', async () => {
     const response = await request(app).delete('/users/me')
    .set('Authorization',  `Bearer ${userone.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('should not delete unauthorized user', async () => {
    await request(app).delete('/users/me').send().expect(401)
})

test('should upload an avatar picture', async () => {
    //.attach is a function for uploading picture the path should be from the root of the project
    await request(app).post('/users/me/avatar')
    .set('Authorization', `Bearer ${userone.tokens[0].token}`)
    .attach('avatar', 'test/fixtures/profile-pic.jpg')
    .expect(200)

    //we wanna verify that the picture is stored in database as buffer
    // we use toEqual to compare to object because with .toBe it compare like === and it is not right
    const user = await User.findById(userId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('should update user one with good fileds', async () => {
    await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userone.tokens[0].token}`)
    .send({
        name:'emilia'
    }).expect(200)

    const user = await User.findById(userId)
    expect(user.name).toBe('emilia')

} )

test('should not update with unvalid data', async () => {
    await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userone.tokens[0].token}`)
    .send({
        location : "tehran"
    }).expect(400)
})