const Immobilier = require('../../models/Immobilier');
const OffreEmploi = require('../../models/OffreEmploi');
const {postHelper, employmentOffer } = require('../../helpers/postHelper');
const Candidature = require('../../models/Candidature');


module.exports = function (router) {
    router.post('/offres-immobilier',  (req, res)=>{
        postHelper(req, res, Immobilier(),true,"/offres-immobilier");
    });
    
    router.post('/demandes-immobilier',  (req, res)=>{
    
        postHelper(req, res, Immobilier(),false,"/demandes-immobilier");
    });
    
    router.post('/emploi/offre/create', (req, res) => {
        employmentOffer(req, res, OffreEmploi(),true,"/offres-emploi");
    });
    
    /************************Candidature get *************************/
    
    router.post('/candidatures', (req, res) => {
        let fileName = "";
        if(req.files){
            console.log(req.files.cv)
            let file = req.files.cv;
            fileName = Date.now() + '-' + file.name;
            let dirUploads = './public/uploads';
            file.mv(dirUploads + fileName, err => {
                if (err) throw err;
            });
        }else {
            fileName = '';
        }
        Candidature({
            nom: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            description: req.body.description,
            town:req.body.town,
            location: req.body.location,
            type: req.body.type,
            category: req.body.category,
            experience:req.body.experience,
            cv:fileName
        }).save().then((candidate) => {
            console.log("Registered Candidate", candidate)
            res.redirect('/candidatures');
        });
    });
}