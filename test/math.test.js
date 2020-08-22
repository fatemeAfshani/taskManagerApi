const {fahrenheitToCelsius,celsiusToFahrenheit, add} = require('./math')


test('fahrenheit' , () => {
    const degree = fahrenheitToCelsius(32)
    expect(degree).toBe(0) 
})

test('celsius', () =>{
    const degree = celsiusToFahrenheit(0)
    expect(degree).toBe(32)
})

// done function is for the waiting and async func
// test('async test',  (done) =>{
//    setTimeout(() => {
//         expect(2).toBe(1)
//         done()
//     }, 2000);

// })

//this is not a common way to call a async function
test('adding two number', (done) => {
    add(1,2).then((sum) =>{
        expect(sum).toBe(3)
        done()
    })
})

//more common way is to use async/await
test('adding two number with async/await', async() =>{
    const sum = await add(1,2)
    expect(sum).toBe(3)
})