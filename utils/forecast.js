const request = require('request')


const weatherUrl = 'http://api.weatherstack.com/current?access_key=da49260a3bea50d437f85804354cc4df&query=37.8267,-122.4233&units=m';


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da49260a3bea50d437f85804354cc4df&query=' + latitude + ',' + longitude +'&units=m';
    request({url: url, json: true}, (error, response) => {
    if(error){
            callback('Error!', undefined) // will return undefined if the error doesn't exist
        } else if (response.body.error){
            callback(response.body.error.info, undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + 
            ' degress out. You will feel like it is '+ response.body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast
