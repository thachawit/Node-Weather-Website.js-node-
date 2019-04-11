const request = require('request')

const forecast=(longtitude,latitude,callback)=>{
    const url ='https://api.darksky.net/forecast/ccd74a33292b986639117b2dbafe5514/' + encodeURIComponent(latitude)+',' + encodeURIComponent(longtitude)+'?units=si'
request({url , json:true},(error,{body})=>{
    if(error){
        callback('unable to connect to weather app',undefined)
    }else if(body.error ){
        callback('unable to find a location',undefined)  
    }else{
        callback(undefined ,(body.daily.data[0].summary+' Now the temperature is ' + body.currently.temperature +'\n' + ', The percentage that precipitation is going to happen is '+ body.currently.precipProbability+'%.' + 'The highest apparent temperature is at '+ body.daily.data[0].apparentTemperatureHigh+' and the Lowest apparent temperature is at '+ body.daily.data[0].apparentTemperatureLow
        +'  (Units : Celsius)')
        )}
  })
}

  module.exports = forecast