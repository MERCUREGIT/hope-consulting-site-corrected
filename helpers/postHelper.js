const {  uploadDir } = require('./upload-helper');

module.exports = {

    postHelper: (req, res, dbmodelInstance, offerStatus, redirectPage)=>{
        if(req.files){
            console.log(req.files.file_contact)
            let file = req.files.file_contact;
            var fileName = Date.now() + '-' + file.name;
            file.mv(uploadDir + fileName, err => {
                if (err) throw err;
            });
        }else {
            fileName = '';
        }
           try{
            dbmodelInstance.offre=offerStatus;
            dbmodelInstance.vendor_name= req.body.name_contact;
            dbmodelInstance.phone_number=req.body.tel_contact;
            dbmodelInstance.email= req.body.email_contact;
            dbmodelInstance.loaction=req.body.ville_contact;
            dbmodelInstance.topic=req.body.object_contact;
            dbmodelInstance.town=req.body.town;
            dbmodelInstance.quater=req.body.quater;
            dbmodelInstance.description= req.body.message_contact;
            dbmodelInstance.image= fileName;
            dbmodelInstance.area= req.body.area;
            dbmodelInstance.Price = req.body.price;
            dbmodelInstance.house = req.body.house;
           }
           catch(err){
               console.log(err)
           }
           dbmodelInstance.save().then(()=>{
               console.log(req)
               res.redirect(redirectPage)
    });
    },
    employmentOffer: (req, res,dbmodelInstance, isOffer, redirectUrl) => {

        if (isOffer) {
            try{
                dbmodelInstance.entreprise= req.body.entreprise;
                dbmodelInstance.site_web= req.body.site_web;
                dbmodelInstance.phone_number=req.body.phone_number;
                dbmodelInstance.email= req.body.email;
                dbmodelInstance.category=req.body.category;
                dbmodelInstance.type=req.body.type;
                dbmodelInstance.town=req.body.town;
                dbmodelInstance.quater=req.body.quater;
                dbmodelInstance.description= req.body.message_contact;
                dbmodelInstance.poste= req.body.poste;
                dbmodelInstance.date_expiration = req.body.date_expiration;
                dbmodelInstance.location = req.body.location;
                dbmodelInstance.description = req.body.description;
                dbmodelInstance.experience = req.body.experience;
               }
               catch(err){
                   console.log(err)
            }
        }
        else if(!isOffer) {
            if(req.files){
                console.log(req.files.cv)
                let file = req.files.cv;
                var fileName = Date.now() + '-' + file.name;
                file.mv(uploadDir + fileName, err => {
                    if (err) throw err;
                });
            }else {
                fileName = '';
            }
            dbmodelInstance.nom= req.body.name;
            dbmodelInstance.phone_number= req.body.phone_number;
            dbmodelInstance.email= req.body.email;
            dbmodelInstance.description= req.body.description;
            dbmodelInstance.location= req.body.location;
            dbmodelInstance.type= req.body.type;
            dbmodelInstance.category= req.body.category;
            dbmodelInstance.experience=req.body.experience;
            dbmodelInstance.cv = fileName;
        }
        dbmodelInstance.save().then(()=>res.redirect(redirectUrl))
    }
}
