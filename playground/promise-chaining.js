require('../src/db/mongoose.js')
const User = require('../src/models/User.js')

//update and count using promise chaining

// User.findByIdAndUpdate('5f31565f58325914483ae0ec', { age: 1}).then( (user) => {
//      console.log(user)
//      return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

//update and count using async-await

const updateandcount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateandcount('5f31565f58325914483ae0ec', 2).then((count) =>{
    console.log(count)
}).catch((e) =>{
    console.log(e)
})