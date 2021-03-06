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
const { filter } = require('compression');


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


//*****************get demande immobilier ********/


router.get('/offres-immobilier',(req, res)=>{
    Immobilier.find({offre:true}).then(immobilier => {
        res.render('home/immobilier/offre/offres-immobilier', { immobilier: immobilier});
    });
});

router.get('/offres-immobilier/create',(req, res)=>{
    Immobilier.find({offre:true}).then(immobilier => {
        res.render('home/immobilier/offre/offres-immobilier-create', { immobilier: immobilier});
    });
});


router.get('/offres-immobilier/:search_term', (req, res) => {
    const search_term = req.params.search_term;
    Immobilier.find({ offre: true }).then(immobilier => {
        const search_result =  immobilier.filter((item) => {
            return item.vendor_name.includes(search_term) || item.topic.includes(search_term) || item.description.includes(search_term) || item.loaction.includes(search_term);
        })
        res.render('home/immobilier/offre/offres-immobilier', { immobilier: search_result, search_term:search_term});
    });
});

//*****************get offre immobilier ********/

router.get('/demandes-immobilier',(req, res)=>{
    Immobilier.find({offre:false}).then(immobilier => {
        res.render('home/immobilier/demande/demande-immobilier', { immobilier: immobilier});
    });
});
router.get('/demandes-immobilier/create',(req, res)=>{
    Immobilier.find({offre:false}).then(immobilier => {
        res.render('home/immobilier/demande/demande-immobilier-create', { immobilier: immobilier });
    });
});

router.get('/demandes-immobilier/:search_term', (req, res) => {
    const search_term = req.params.search_term;

    Immobilier.find({ offre: false }).then(immobilier => {
        console.log(immobilier)
        const search_result = immobilier.lenght !=0 && immobilier.filter((item) => {
            return item.vendor_name.includes(search_term) || item.topic.includes(search_term) || item.description.includes(search_term) || item.loaction.includes(search_term);
        })
        res.render('home/immobilier/demande/demande-immobilier', { immobilier: search_result , search_term:search_term});
    });
});

router.get('/immobilier/details/:id', (req, res) => {
    const id = req.params.id
    Immobilier.find({ _id: id })
        .then(immob => {
            console.log(immob)
            res.render('home/immobilier/details',{immobilier:immob})
        })
        .catch((err) => {
        
    })
})

router.get('/emploi/details/:id', (req, res) => {
    const id = req.params.id
    OffreEmploi.find({ _id: id })
        .then(emploi => {
            res.render('home/immobilier/details',{emploi})
        })
})


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
        res.render('home/emploi/offres',{
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


module.exports = router;