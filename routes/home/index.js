const express = require('express');
const router = express.Router();
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const OffreEmploi = require('../../models/OffreEmploi');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');
const {postHelper, employmentOffer } = require('../../helpers/postHelper');
const paginator = require('../../helpers/paginations');
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



router.get('/offres-immobilier', (req, res) => {
    const page = req.query.page;
    Immobilier.find({ offre: true }).then(immobilier => {
        res.render('home/immobilier/offre/offres-immobilier', { immobilier:paginator(page,immobilier,10)});
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
    Immobilier.find({ offre: false }).then(immobilier => {
        const page = req.query.page;
        res.render('home/immobilier/demande/demande-immobilier', { immobilier: paginator(page,immobilier,10)});
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


/*****************post demande et offre immobilier ********/

router.post('/offres-immobilier',  (req, res)=>{
    postHelper(req, res, Immobilier(),true,"/offres-immobilier");
});

router.post('/demandes-immobilier',  (req, res)=>{

    postHelper(req, res, Immobilier(),false,"/demandes-immobilier");
});



/************************Emplois offre get post *************************/


router.get('/emploi/details/:id', (req, res) => {
    const id = req.params.id
    OffreEmploi.find({ _id: id })
        .then(emploi => {
            OffreEmploi.find({ category: emploi[0].category })
                .then(related => {
                    res.render('home/emploi/offre-details', { emploi, related:related.slice(4) });
            })
        });
});

router.get('/offres-emploi', (req, res)=>{
    OffreEmploi.find({}).then(offers=>{
        res.render('home/emploi/offres',{
            offers:offers
        });
    });
});

router.get('/offres-emploi/:search_term', (req, res) => {
    const search_term = req.params.search_term;
    console.log("term",search_term)

    OffreEmploi.find().then(emploi => {
        const search_result =  emploi.lenght != 0 && emploi.filter((item) => {
                return item.description.includes(search_term) ||  item.type.includes(search_term) || item.category.includes(search_term) || item.entreprise.includes(search_term) || item.Poste.includes(search_term) || item.experience.includes(search_term) || item.location.includes(search_term)
        });
        res.render('home/emploi/offres', { offers: search_result , search_term:search_term});
    }).catch(err => {
        res.render('home/emploi/offres', { offers: false , search_term:search_term});
    });
});""

router.get('/emploi/offre/create', (req, res)=>{
    OffreEmploi.find({}).then(offers=>{
        res.render('home/emploi/offre-create',{
            offers:offers
        });
    });
});

router.post('/emploi/offre/create', (req, res) => {
    employmentOffer(req, res, OffreEmploi(),true,"/offres-emploi");
});

router.get('/offres-filter', (req, res) => {
    const filterCategory = req.query.category;
    const filterExperience = req.query.type;
    const filterLocation = req.query.location;
    console.log(req.query)
    OffreEmploi.find({ category:filterCategory,
        type: filterExperience, location:filterLocation
    }).then(offers => {
        res.render('home/emploi/offres',{
            offers:offers, search_term:{category:filterCategory, experience:filterExperience,location:filterLocation }
        });
    });
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



router.get('/candidatures', (req, res)=>{
     Candidature.find({}).then(candidates=>{
         res.render('home/emploi/candidatures',{
            candidates:candidates
         });
     });
});
router.get('/candidatures/:id', (req, res)=>{
     Candidature.find({_id:req.params.id}).then(candidate=>{
         res.render('home/emploi/candidature-details',{
            candidate:candidate
         });
     });
});

router.get('/candidatures-create', (req, res) => {
         res.render('home/emploi/candidatures-create');
});

router.get('/candidatures-filter', (req, res) => {
    const filterCategory = req.query.category;
    const filterExperience = req.query.experience;
    const filterLocation = req.query.location;

    Candidature.find({ category:filterCategory,
        experience: filterExperience, location:filterLocation
    }).then(candidates => {
        res.render('home/emploi/candidatures',{
           candidates:candidates, search_term:{category:filterCategory, experience:filterExperience,location:filterLocation  }
        });
    });
});

router.get('/candidatures-emploi/:search_term', (req, res) => {
    const search_term = req.params.search_term;

    Candidature.find({ offre: false }).then(candidates => {
        console.log(candidates)
        const search_result = candidates.lenght != 0 && candidates.filter((item) => {
            console.log("Selected Item",item)
            return item.nom.includes(search_term) || item.email.includes(search_term) || item.description.includes(search_term) || item.location.includes(search_term) || item.experience.includes(search_term) || item.category.includes(search_term);
        });
        res.render('home/emploi/candidatures', { candidates: search_result , search_term:search_term});
    });
});

module.exports = router;