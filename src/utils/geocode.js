const request = require('request');


const geocode = (address,callback) => {
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXVqYWhpZDk4IiwiYSI6ImNraDNyd3d5bjA0YXYycXM1cWkyaWRhYmoifQ.eBRvS2oc3afFuRAqe9qS6w'


    request( {url : geocodeurl, json: true}, (error,{ body }) => {
        if (error) {
            callback('Unable to connect the location api',undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. try another search',undefined);
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;