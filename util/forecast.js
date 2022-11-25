const req = require('request')

const forecast=(latitude,longitude,location,cb)=>{
    const url = "http://api.weatherstack.com/current?access_key=9aad2c1623c6b106c2e02ed8e0b4cfab&query="+latitude+','+longitude;
    
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
