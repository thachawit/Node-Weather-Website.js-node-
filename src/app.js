const express = require('express')
const path = require('path') 
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const publicdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicdir))

app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather Forecast',
        name:'shield'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about ME',
        name :'shield'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'NeeD HelP?',
        head:'more about help',
        name:'shield'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address must be provided.'
        })
    }else{
    geocode(req.query.address, (error,{longtitude,latitude,place}={})=>{
        if(error){
            return res.send({error:error})
        }
        
        
        forecast(longtitude,latitude, (error, forecastData) => {
            if(error){
                return res.send({error:error})
            }
            
            console.log(req.query.address)
            res.send({
                location:place,
                forecast:forecastData,
                Address:req.query.address
            })
    
        })
    })
    }

})



app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Not Found',
        errortext:'Help article not found',
        name:'shield'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page error',
        errortext:'Page not found',
        name:'shield'
    })
})

app.listen(3000, ()=>{
    console.log('server is starting.')
})