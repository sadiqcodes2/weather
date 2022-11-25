const req = require('request')

const geoloc=(address,cb)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?worldview=cn&access_token=pk.eyJ1Ijoic2FkaXFjb2RlcyIsImEiOiJjbGF3cHJveGMwaTNsM3BuOHFoZ2w3YXAzIn0.oY7H0T5B-3Spibo17hPU0Q"
    req({url:url,json:true},(error,{body}) => {
        if( error ) cb('Unable to connect to location service', undefined)
        else if( body.features.length == 0 ) cb('Unable to find location. Try another search', undefined)
        else{cb(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })}
    })
}

module.exports=geoloc
