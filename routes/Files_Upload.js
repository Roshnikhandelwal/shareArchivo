const multer = require('multer');
const path = require('path');
const File=require('../models/collectionFile')
const { v4:uuid4 }=require('uuid')
const router = require('express').Router();

//multer basic configuration to deal with files
let storage = multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(
        file.originalname)}`;
        cb(null,uniqName);
    }
})
let upload=multer({
    storage,
    limit: { fileSize: 1000000*100 },
}).single('myfile');


router.post('/',(req,res)=>{
    //file store
    upload(req,res,async(err)=>{
        //validate request
        if(!req.file){
            return res.json({error:'all fields are required.'})
        }
        if(err){
            return res.status(500).send({error:err.message})
        }
        //store into dataBase
        const file = new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path: req.file.path,
            size:req.file.size
        });
        const response= await file.save();
        //response link
        return res.json({file:`${process.env.appBaseUrl}files/${response.uuid}`});
    });
    
});
router.post('/send',async (req,res)=>{
    
    const{uuid,emailTo,emailFrom }=req.body;
    //validation error status 422
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({error:"all fields are required"});
    }
    //fetch data from database
    const file=await File.findOne({uuid:uuid})
    // if (file.sender){
    //     return res.status(422).send({error:"Email already sent."});
    // }
    file.sender=emailFrom;
    file.receiver=emailTo;
    const response= await file.save();
    //send email
    const sendMail=require('../services/emailService')
    sendMail({
        from:emailFrom,
        to:emailTo,
        subject:"shareArchivo file sharing",
        text:`${emailFrom} shared file with you`,
        html: require('../services/emailTemplate')({
            emailFrom:emailFrom,
            downloadLink:`${process.env.appBaseUrl}/files/${file.uuid}`,
            size:parseInt(file.size/1000)+'KB',
            expires:"24 hours"
        })
    });
    return res.send({success:true})


});

module.exports=router;