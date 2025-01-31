
const request = require('request');


const forecast = (latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=18ae86ff578326fda3ed63bf63e8be68&query='  + latitude +  ',' + longitude + '&units=f';

    request({url : url,json:true},(error,{ body })=>{  
        if(error)
        {
            callback('Unable to connect to weather api',undefined);
        } else if(body.error) {
            callback('Unable to find location',undefined);
        } else {
            callback(undefined,body.current.weather_descriptions +'. It is currently ' + body.current.temperature + ' degrees out')
        }
    })

}


module.exports = forecast;