const express = require('express');
const router = express.Router();
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const OffreEmploi = require('../../models/OffreEmploi');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');
const {postHelper} = require('../../helpers/postHelper');
const User = require('../../models/User');
const Candidature = require('../../models/Candidature');
const bcryptjs = require('bcryptjs');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

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


router.post('/plans',(req,res)=>{
    instance = new PlanEtDessin(
       { image: req.body.image,
    nom:req.body.nom}
    ).save().then(()=>{
        res.send("done")
    }) ;
    
})

// Construction services and works


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





// post des offre et demande immobilier

router.post('/groundOffers',  (req, res)=>{


    // postHelper(req, res, Immobilier(),true,"/offres-immobilier");



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

    const newPost = new Immobilier({
        offre:true,
        vendor_name: req.body.name_contact,
        phone_number: req.body.tel_contact,
        email: req.body.email_contact,
        loaction: req.body.ville_contact,
        topic: req.body.object_contact,
        description: req.body.message_contact,
        image: "" + fileName
    });


newPost.save().then(()=>{
    res.render("home/offres-immobilier");
});
});

router.post('/demandes-immobilier',  (req, res)=>{
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

    const newPost = new Immobilier({
        offre:false,
        vendor_name: req.body.name_contact,
        phone_number: req.body.tel_contact,
        email: req.body.email_contact,
        loaction: req.body.ville_contact,
        topic: req.body.object_contact,
        description: req.body.message_contact,
        image: "" + fileName
    });


newPost.save().then(()=>{
    res.redirect("/demandes-immobilier");
});
});


router.post('/employmentOffers',  (req, res)=>{
    if(req.files){
        console.log(req.files.file_contact)
        let file = req.files.file_contact;
        var fileName = Date.now() + '-' + file.name;
        let dirUploads = './public/uploads/emploi/';
        file.mv(dirUploads + fileName, err => {
            if (err) throw err;
        });


        console.log(req.files);
    }else {
        fileName = '';
    }

    const newPost = new OffreEmploi({
        offre:true,
        vendor_name: req.body.name_contact,
        phone_number: req.body.tel_contact,
        email: req.body.email_contact,
        loaction: req.body.ville_contact,
        topic: req.body.object_contact,
        description: req.body.message_contact,
        image: "" + fileName
    });


newPost.save().then(()=>{
    res.redirect("/offres-emploi");
});
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
});










router.get('/offres-emploi', (req, res)=>{
    OffreEmploi.find({}).then(offers=>{
        res.render('home/offres',{
            offers:offers
        });
    });
})




router.get('/candidatures', (req, res)=>{
     Candidature.find({}).then(candidates=>{
         res.render('home/candidatures',{
            candidates:candidates
         });
     });
});

router.post('/candidatures', (req, res)=>{
    let instance = Candidature({
        nom:req.body.name_contact,
        telephone:req.body.tel_contact,
        email:req.body.email_contact,
        desciption:req.body.message_contact
    }).save().then(()=>{
        res.redirect('/candidatures');
    })
})




// router.get('/details/:id', (req, res) => {
//     Post.findOne({ _id: req.params.id }).then(post => {
//         console.log(post)
//         res.render('home/details', { post: post });
//     });
// });


// app.get('/offres-immobilier-admin', async (req, res)=>{
//     let offers = new Offers();
//     try {
//         let response = await offers.getGroundOffersAdmin();
//         res.send(response);
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.get('/offres-admin', async (req, res)=>{
//     let offers = new Offers();
//     try {
//         let response = await offers.getOffersAdmin();
//         res.send(response);
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.post('/groundOffers', (req, res)=>{
//     let offers = new Offers();
//     offers.addGroundOffers(req);
//     res.redirect('/offres-immobilier');
// });

// app.post('/employmentOffers', (req, res)=>{
//     let offers = new Offers();
//     offers.addEmploymentOffers(req);
//     res.redirect('/offres-emploi');
// });

// app.post('/candidatures', urlencodedParser, (req, res)=>{
//     let candidate = new Candidatures();
//     candidate.addCandidate(req.body);
//     res.redirect('/candidatures');
// });

// app.post('/demandes-immobilier', urlencodedParser, (req, res)=>{
//     let demand = new Candidatures();
//     demand.addDemand(req.body);
//     res.redirect('/demandes-immobilier');
// })

// // look for form stuffs here

// router.get('/register', (req, res) => {
//     res.render('home/register');
// });

router.post('/register', (req, res) => {

    const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save().then(result => {
                req.flash('success_message', "You are now registered")
                res.redirect('/login');
            });
        });
    });
});



module.exports = router;