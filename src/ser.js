const ex=require('./appn.js')
const path=require('path')
const express=require('express')
const { setServers } = require('dns')
const hbs=require('hbs')
const { readdirSync } = require('fs')
const serv=express()
const p=process.env.PORT || 3000

const j=path.join(__dirname,'../public')
const p=path.join(__dirname,'../partials')
serv.use(express.static(j))
serv.set('view engine','hbs')
hbs.registerPartials(p)

serv.get('',(req,res)=>{
    res.render('index',{
        name:'mausam',
        title:'welcome to weather site'
    })
})
serv.get('/about',(req,res)=>{
    res.render('about',{
        name:'mausam',
        title:'about..'
    })
})
serv.get('/help',(req,res)=>{
    res.render('help',{
        name:'mausam',
        title:'help..'
    })
})
serv.get('/help/*',(req,res)=>{
    res.render('er',{
        name:'mausam',
        error:'my page 404'
    })
})
serv.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
            error:'provide address'
        })
    }

    ex.geocode(req.query.address,(error,{latitude,longitude})=>{
        console.log(latitude)
        if(error){
        return res.send('error',error)}
        else{
           // res.send('data',longitude,latitude)
        ex.forc(latitude,longitude,(error1,d={})=>{
          if(error1){
               return res.send('error',error1)}
                else{
       return res.send(d)
                }
        })}
    })

 
})

serv.get('*',(req,res)=>{
    res.render('er',{
        name:'mausam',
        error:'my page 404'
    })
})


serv.listen(p,()=>{
    console.log('server started at '+p)
})
