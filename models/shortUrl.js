const mongoose =require('mongoose');
const shortid=require('shortid');

const Url=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        default:0
    }
})

const urlmodel=mongoose.model('Url',Url);
module.exports=urlmodel;