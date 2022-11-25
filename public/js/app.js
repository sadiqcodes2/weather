const weatherLoc = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mOne')
const messageTwo = document.querySelector('#mTwo')
const messageThree = document.querySelector('#mThree')
const messageFour = document.querySelector('#mFour')
const messageFive = document.querySelector('#mFive')
const messageSix = document.querySelector('#mSix')
const image1 = document.querySelector('[data-label="image1"] img')

weatherLoc.addEventListener('submit', ( event )=>{
    event.preventDefault()
    document.querySelector('.wBox').style.display = 'block'
    const location = search.value
    image1.src = ''
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    weather(location)
})

const weather = ( location ) =>{
    fetch( `/weather?address=${location}` ).then((response)=>{
        response.json().then(( data ) => {
            console.log(data)
            if(data.error){
                messageOne.textContent = data.error
                messageThree.textContent = ''
            }else{
                messageOne.textContent = `${data.forecast.temperature} °C`
                messageTwo.textContent = `Real Feel like ${data.forecast.feelslike} °C`
                messageThree.textContent = data.location
                messageFour.textContent = `Weather is ${data.forecast.weather_descriptions[0]}`
                messageFive.textContent = `Humidity is ${data.forecast.humidity} %`
                messageSix.textContent = `Visibility is ${data.forecast.visibility} %`
                image1.src = data.forecast.weather_icons[0]
                document.querySelector('.wBox2').style.display = 'block'
            }
        })
    })
}