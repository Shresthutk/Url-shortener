const { render } = require('ejs');
const mongoose=require('mongoose');
const express= require('express');
require('dotenv').config();
const ShortUrl=require('./models/shortUrl')
const app= express();

console.log(process.env)
//convert to dotenv
const port=process.env.PORT;
const URI= process.env.mongURI;

//connecting to db
mongoose.connect((URI),()=>{
    console.log("connected to db")
})
 
app.set('view engine', 'ejs');
 
app.get('/',async (req,res)=>{
    try{
        const shortUrls=await ShortUrl.find({})
        res.render('index',{shortUrls:shortUrls}) 
    }catch(error){
        res.status(500).json({error:"Nothing to show here"})
    }
  
})
 
//required middleware to use url properly
app.use(express.urlencoded({extended:false}))

//adding full url to db
app.post('/shorturl',async (req,res)=>{
  await ShortUrl.create({full:req.body.fullUrl})
    res.redirect('/')
})


app.get('/:shortUrl',async(req,res)=>{
   const shortUrl= await ShortUrl.findOne({short:req.params.shortUrl})

   if(shortUrl==null){
       return res.sendStatus(404);

   }
   shortUrl.clicks++;
   shortUrl.save();
   res.redirect(shortUrl.full)
})

app.listen(port||5500,()=>{
    console.log('listening..')
})