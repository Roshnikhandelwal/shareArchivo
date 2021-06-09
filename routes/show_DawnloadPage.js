const router = require('express').Router();
const File = require('../models/collectionFile')


router.get('/:uuid',async (req,res)=>{
    try{
        const file = await File.findOne({uuid: req.params.uuid})
        if (!file){
            return res.render('download.ejs',{error:"link has been expired"})
        }
        return res.render('download.ejs',{
            uuid:file.uuid,
            filename:file.filename,
            fileSize: file.size,
            downloadLink:`${process.env.appBaseUrl}/files/download/${file.uuid}`

        })
    }catch(e){
        return res.render('dawnload.ejs',{error:"someting went wrong"})
    }
});

module.exports=router;