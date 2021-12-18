const request=require('request')
//const yargs=require('yargs')


const geocode=(add,callback)=>{
const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(add)+'.json?access_token=pk.eyJ1IjoibWF1c2FtcmFuaSIsImEiOiJja2MzNzQ2MzYxc2FvMnRuNGlzNjAwNGkzIn0.bIDrmVo85ne6MpjYoJ0Y7g&limit=1'
request({url:url2,json:true},(error,Response)=>{
    if(error)
    {
        callback('network problem',undefined)
    }
    else if(Response.body.features.length === 0)
    {
        callback('location not found',undefined)
    }
    else{
        callback(undefined,{
            latitude:Response.body.features[0].center[1],
            longitude:Response.body.features[0].center[0],
            location:Response.body.features[0].place_name
        })
    }
})
}

const forc=(lat,long,callb)=>{
    const url1='http://api.weatherstack.com/current?access_key=40722f0bcaa2e9ee337e6994e49d29b6&query='+lat+','+long+''
    request({url:url1,json:true},(error,response)=>{
        if(error){
            console.log(error)
            callb('netork issue',undefined)
        }else if(response.body.error){
            callb(response.body.error,undefined)
        }
        else{
       callb(undefined,{
           temp:response.body.current.temperature,
        feels:response.body.current.temperature
    })
      // callb(undefined,response.body.current.temperature)
      // callb(undefined,'but it fells like ')
       //callb(undefined,response.body.current.temperature)
        }
    })
}



module.exports={
    geocode:geocode,
    forc:forc
}