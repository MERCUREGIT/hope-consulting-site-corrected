module.exports = {

    postHelper: (req, res, dbmodel, offerStatus, redirectPage)=>{
        if(req.files){
            console.log(req.files.file_contact)
            let file = req.files.file_contact;
            var fileName = Date.now() + '-' + file.name;
            let dirUploads = './public/uploads/';
            file.mv(dirUploads + fileName, err => {
                if (err) throw err;
            });
    
    
            console.log(req.files);
        }else {
            fileName = '';
        }
           try{
            dbmodel.offre=offerStatus;
            dbmodel.vendor_name= req.body.name_contact;
            dbmodel.phone_number=req.body.tel_contact;
            dbmodel.email= req.body.email_contact;
            dbmodel.loaction=req.body.ville_contact;
            dbmodel.topic=req.body.object_contact;
            dbmodel.description= req.body.message_contact;
            dbmodel.image= fileName;
           }
           catch(err){
               console.log(err)
           }
       
    
    
           dbmodel.save().then(()=>{
               console.log(req)
               res.render("home/offres-immobilier")
    });
    }
}