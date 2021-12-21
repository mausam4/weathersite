
console.log('client side')
//fetch('http://localhost:3000/weather?address=bhiwani').then((response)=>{
   // response.json().then((data)=>{
        //console.log(data)
  //  })
   
//})
const el=document.querySelector('form')
const sb=document.querySelector('input')
const m11=document.querySelector('#m1')
const m22=document.querySelector('#m2')

m11.textContent=' loading'
m22.textContent=' '

el.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc=sb.value
    console.log(loc)
    fetch('/weather?address='+loc+'').then((response)=>{
    response.json().then((data)=>{
         console.log(data.temp)
         const a=data.temp
        m11.textContent=a
      m22.textContent=data.feels 
    })
})

})

      