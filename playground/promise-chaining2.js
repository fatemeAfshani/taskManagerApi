require('../src/db/mongoose.js')
const Task = require('../src/models/Task.js')

// Task.findByIdAndRemove('5f31596d6c39f227a01e07ce').then((result) => {
//     console.log(result)
//     return Task.countDocuments({complited : false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(result)
// })


const deleteandcount  = async (id) => {
   await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({complited: false})
    return count
}

deleteandcount('5f31405a17e94b1ca009e42a').then((count) => {
    console.log(count)

}).catch((e) => {
    console.log(e)
})