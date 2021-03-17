const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');



module.exports = function (router, dashboard_url) {
    function handleStaticFileUpload(req,res)
    {
        let fileName = "";
    if(req.files){
        let file = req.files.image;
        fileName = Date.now() + '-' + file.name;
        let dirUploads = './public/uploads';
        file.mv(dirUploads + fileName, err => {
            if (err) throw err;
        });
    }else {
        fileName = '';
        }
        return fileName;
    }
    
router.post('/architectures', (req, res) => {
    Architecture({
        image: handleStaticFileUpload(req, res),
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect(dashboard_url);
    }).catch(err=>{
        console.log(err)
    })
});
    
router.post('/realisations', (req, res) => {
  
    RealisationEtSuivi({
        image:  handleStaticFileUpload(req, res),
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect(dashboard_url);
    }).catch(err=>{
        console.log(err);
    })
});


router.post('/plans', (req, res) => {
    PlanEtDessin({
        image: handleStaticFileUpload(req, res),
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect(dashboard_url);
    }).catch(err=>{
        
    })
});
    router.post('/login', (req, res) => {
 
    });
    router.delete('/denyGroundOffer/:id', (req, res)=>{
    Immobilier.findOne({_id: req.params.id }).then(immobilier=>{
        fs.unlink(uploadDir + immobilier.file, err => {});
        immobilier.remove();
        res.redirect(dashboard_url);
    });
});

}