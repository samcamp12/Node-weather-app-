const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { get } = require('http')
const { query } = require('express')
const app = express()

const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

// define paths for express config
const publicDirPath = path.join(__dirname, '../public') // make a path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlers engine and views location
app.set('view engine', 'hbs') // https://www.npmjs.com/package/hbs
app.set('views', viewsPath) // change the default view folder to current 
hbs.registerPartials(partialsPath) // Partials are basically just views that are designed to be used from within other views.

// setup static directory to serve
app.use(express.static(publicDirPath))
app.get('', (req, res) => { // request, response, '' is root page;
    res.render('index', {
        title: 'Weather App',
        name: 'Ji'
    })
})

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'About Me',
        name: 'Ji'
    })
})

app.get('/help', (req, res) => { 
    res.render('help', {
        helpText: 'This is aome helpful text',
        title: 'Help',
        name: 'Ji'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location) // request
        return res.send({
            error: 'You must provide a location'
        })
    geocode(req.query.location, (error, geoData = {}) => { // geodata: {latitude, longtitude, location}
        if(error) {
            return res.send({ error }) // stop running the callback
        }
            forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                return res.send({
                    location: geoData.location,
                    forecast: forecastData
            })
        })
    })
})


app.get('/propducts', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You mest provide a search term'
        })
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { 
    res.render('404', {
        title:'404',
        name: 'Ji',
        helpText: 'This is some helpful text.',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => { // * means match anything haven't been matched so far
    res.render('404', { // could render different things on one 404 page
        title:'404',
        name: 'Ji',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})