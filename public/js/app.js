console.log("JS working")

const weatherLoc = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mOne')
const messageTwo = document.querySelector('#mTwo')

weatherLoc.addEventListener('submit', ( event )=>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    weather(location)
})

const weather = ( location ) =>{
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then(( data ) => {
            console.log(data)
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else{
                messageTwo.textContent = data.location
                messageOne.textContent = data.forecast
            }
        })
    })
}