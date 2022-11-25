const req = require('request')

const forecast=(latitude,longitude,location,cb)=>{
    const url = "http://api.weatherstack.com/current?access_key=e1b8480d0f5a7c7d0f65b6506b03ddab&query="+latitude+','+longitude;
    
    req({ url, json: true }, (error, { body }) => {
        if (error) {
            cb('Unable to connect to weather service!', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else{
            cb(undefined, body.current)
        }
    })

}

module.exports=forecast