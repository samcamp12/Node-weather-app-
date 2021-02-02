console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent the browser to refresh after submission

    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather/?location=' + location).then((response) => { // client side javascript, can not be used in backend node.js script
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {   
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

})

