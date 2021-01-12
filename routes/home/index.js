const express = require('express');
const router = express.Router();
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const OffreEmploi = require('../../models/OffreEmploi');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');
const {postHelper} = require('../../helpers/postHelper');
const Candidature = require('../../models/Candidature');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');


router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

/*****************get general pour autre page ********/

router.get('/', (req, res)=>{
    res.render('home/index');
});
router.get('/services', (req, res)=>{
    res.render('home/services');
});

router.get('/about', (req, res) => {
    res.render('home/about');
});
router.get('/comptabilite', (req, res)=>{
    res.render('home/comptabilite');
});


/*****************gest des realisation ********/

router.get('/realisations', (req, res) => {
    RealisationEtSuivi.find({}).then(realisationEtSuivi => {
        res.render('home/realisations', { realisationEtSuivi: realisationEtSuivi});
    });
});
router.get('/architectures', (req, res) => {
    Architecture.find({}).then(architectures => {
        res.render('home/architectures', { architectures: architectures});
    });
});
router.get('/plans', (req, res) => {
    PlanEtDessin.find({}).then(planEtDessin => {
        res.render('home/plans', { planEtDessin: planEtDessin});
    });
});


//*****************get demande et offre immobilier ********/


router.get('/offres-immobilier',(req, res)=>{
    Immobilier.find({offre:true}).then(immobilier => {
        res.render('home/offres-immobilier', { immobilier: immobilier});
    });
});
router.get('/demandes-immobilier',(req, res)=>{
    Immobilier.find({offre:false}).then(immobilier => {
        res.render('home/offres-immobilier', { immobilier: immobilier});
    });
});




/*****************post demande et offre immobilier ********/

router.post('/groundOffers',  (req, res)=>{

postHelper(req, res, Immobilier(),true,"/offres-immobilier");


});

router.post('/demandes-immobilier',  (req, res)=>{

    postHelper(req, res, Immobilier(),false,"/demandes-immobilier");
});



/************************Emplois Post *************************/

router.post('/employmentOffers',  (req, res)=>{
    postHelper(req, res, OffreEmploi(),true,"/offres-emploi");
});

router.post('/candidatures', (req, res)=>{
    Candidature({
        nom:req.body.name_contact,
        telephone:req.body.tel_contact,
        email:req.body.email_contact,
        desciption:req.body.message_contact
    }).save().then(()=>{
        res.redirect('/candidatures');
    })
})


/************************Emplois get *************************/

router.get('/offres-emploi', (req, res)=>{
    OffreEmploi.find({}).then(offers=>{
        res.render('home/offres',{
            offers:offers
        });
    });
});

router.get('/candidatures', (req, res)=>{
     Candidature.find({}).then(candidates=>{
         res.render('home/candidatures',{
            candidates:candidates
         });
     });
});


router.get("/test",(req,res)=>{
    Candidature.find({}).then(docc=>{
        res.json(docc);
    })
})








/**
 * Decsription: admin routes
 */






router.get('/admin', (req, res)=>{
    res.redirect('https://hope-consulting-dashboard.netlify.app/')
});


// used API

router.get('/admin/offres-immobilier-admin', (req, res)=>{
    Immobilier.find({}).then(imobilier=>{
        res.json(imobilier);
    });
});



//works done post

router.post('/admin/architectures', (req, res)=>{
    Architecture({
        image: req.body.image,
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect('/home');
    }).catch(err=>{
        
    })
});

router.post('/admin/realisations', (req, res)=>{
    RealisationEtSuivi({
        image: req.body.image,
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect('/home');
    }).catch(err=>{
        
    })
});

router.post('/admin/plans', (req, res)=>{
    PlanEtDessin({
        image: req.body.image,
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect('/home');
    }).catch(err=>{
        
    })
});

// ######################################################


// Unused for now

router.get('/admin/architecture-admin', (req, res)=>{
    Architecture.find({}).then(architecture=>{
        res.status(200).json(architecture);
    });
});

router.get('/admin/realisation-admin', (req, res)=>{
    RealisationEtSuivi.find({}).then(realisationEtSuivi=>{
        res.status(200).json(realisationEtSuivi);
    });
});

router.get('/admin/plans-admin', (req, res)=>{
    PlanEtDessin.find({}).then(plan=>{
        res.status(200).json(plan);
    });
});




router.delete('/admin/denyGroundOffer/:id', (req, res)=>{
    Immobilier.findOne({_id: req.params.id }).then(immobilier=>{
        fs.unlink(uploadDir + immobilier.file, err => {});
        immobilier.remove();
        res.redirect("https://hope-consulting-dashboard.netlify.app/home");
    });
});







module.exports = router;