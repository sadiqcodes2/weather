const path = require('path')
const express = require('express')
const hbs = require('hbs')

const port = process.env.PORT || 3000

const req = require('request')
const geoloc = require('../util/geocode')
const forecast = require('../util/forecast')

const app = express()

//define paths
const publicPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'SADIQ IQBAL'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        name:'SADIQ IQBAL'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT',
        name:'SADIQ IQBAL'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) return res.send({
        error:'Error Please provide a search term.'
    })

    geoloc(req.query.address, (error, { latitude, longitude, location }={})=>{
        if (error) {
            return res.send({ error })
        }
        forecast(latitude,longitude,location,(error, data)=>{
            console.log(data)
            if (error) {
                return res.send({ error })
            }
            else res.send({
                forecast: data,
                location: location
            })
        })
    })

})


app.get('/product',(req,res)=>{
    if(!req.query.search) return res.send({error:'Please provide a search term.'})
    res.send({error:'Please provide a search term.'})
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        error:'Help article Not Found',
        name:'SADIQ IQBAL'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        error:'Page Not Found',
        name:'SADIQ IQBAL'
    })
})


app.listen(port,()=>{
    console.log('Server is UP')
})
