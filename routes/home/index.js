const express = require('express');
const router = express.Router();
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');
// const Category = require('../../models/Category');
const User = require('../../models/User');
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



// router.get('/login', (req, res) => {
//     res.render('home/login');
// });

// router.get('/logout', (req, res) => {
//     req.logOut();
//     res.redirect('/login');
// })



// portfolio files

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


// Construction services and works


router.get('/offres-immobilier',(req, res)=>{
    Immobilier.find({}).then(immobilier => {
        res.render('home/offres-immobilier', { immobilier: immobilier});
    });
});


router.post('/groundOffers',  (req, res)=>{

})



// router.get('/details/:id', (req, res) => {
//     Post.findOne({ _id: req.params.id }).then(post => {
//         console.log(post)
//         res.render('home/details', { post: post });
//     });
// });

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
});



router.post('/demandes-immobilier',(req, res)=>{
    if(!isEmpty(req.files)){
        let file = req.files.file;
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
        vendor_name: req.body.name_contact,
        email: req.body.tel_contact,
        email: req.body.email_contact,
        email: req.body.ville_contact,
        email: req.body.object_contact,
        email: req.body.message_contact,
        email: fileName,
        allowComments: allowComments,
        body: req.body.body,
        category: req.body.category,
        file: fileName
    });
})




// app.get('/comptabilite', (req, res)=>{
//     res.render('comptabilite');
// });

// app.get('/offres-immobilier', async (req, res)=>{
//     let offers = new Offers();
//     try {    
//         let response = await offers.getGroundOffers();
//         res.render('offres-immobilier', {data: response, length: response.length});
//     } catch (error) {
//         console.log(error);
//     }
// });

// app.get('/demandes-immobilier', async (req, res)=>{
//     let demand = new Candidatures();
//     try {
//         let response = await demand.getDemand();
//         res.render('demandes', {data: response, length: response.length});
//     } catch (error) {
//         console.log(error);
//     }
// });

// app.get('/offres-emploi', async (req, res)=>{
//     let offers = new Offers();
//     try {
//         let response = await offers.getEmploymentOffers();
//         res.render('offres', {data: response, length: response.length});
//     } catch (error) {
//         console.log(error);
//     }
// })

// app.get('/candidatures', async (req, res)=>{
//     let candidatures = new Candidatures();
//     try {
//         let response = await candidatures.getCandidatures();
//         res.render('candidatures', {data: response, length: response.length});
//     } catch (error) {
//         console.log(error);
//     }
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