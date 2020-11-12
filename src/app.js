const path = require('path')
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const port = process.env.PORT || 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));



app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather App'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error) {
            return res.send({error});
        }

        forecast(latitude,longitude,(err,forecastData)=>{
            if(err) {
                return res.send({err});
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        errorMessage : 'Page Not found'
    })
})

app.listen(port,()=>{
    console.log('Server is running in port'+ port);
})