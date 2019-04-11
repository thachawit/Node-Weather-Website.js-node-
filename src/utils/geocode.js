const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhhd2lud2l0IiwiYSI6ImNqdG5yMHM2YjAwNWs0NG1ldmVmbzY0NjkifQ.X7GTGEU6b02k2YGYwUJQZQ'
request({url, json:true}, (error,{body})=>{
    if(error){
        callback('unable to connect to the location service!',undefined)
    }else if(body.features.length===0){
        callback('unable to find location.Try another search:)')
    }else{
        callback(undefined,{
            longtitude:((body).features[0].center[0]),
            latitude:((body).features[0].center[1]),
            place:((body).features[0].place_name)
        })
    }
})
}



module.exports = geocode

// geocode('Thailand', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//     console.log(data.longtitude)
// })
