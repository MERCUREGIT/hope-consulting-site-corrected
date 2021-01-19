const express = require('express');
const router = express.Router();
const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const fs = require('fs');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');
const dashboard_url = "https://hope-consulting-dashboard.netlify.app/";

router.get('/', (req, res)=>{
    res.redirect(dashboard_url)
});

router.get('/details/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {
        console.log(post)
        res.render('home/details', { post: post });
    });
});


// used API

router.get('/offres-immobilier-admin', (req, res)=>{
    Immobilier.find({}).then(imobilier=>{
        res.json(imobilier);
    });
});



//works done post

router.post('/architectures', (req, res)=>{
    Architecture({
        image: req.body.image,
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect(dashboard_url);
    }).catch(err=>{
        
    })
});

router.post('/realisations', (req, res)=>{
    RealisationEtSuivi({
        image: req.body.image,
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect(dashboard_url);
    }).catch(err=>{
        
    })
});

router.post('/plans', (req, res)=>{
    PlanEtDessin({
        image: req.body.image,
        nom:req.body.nom
    }).save().then(()=>{
        res.redirect(dashboard_url);
    }).catch(err=>{
        
    })
});

// ######################################################

router.delete('/denyGroundOffer/:id', (req, res)=>{
    Immobilier.findOne({_id: req.params.id }).then(immobilier=>{
        fs.unlink(uploadDir + immobilier.file, err => {});
        immobilier.remove();
        res.redirect(dashboard_url);
    });
});


router.post('/login',(req, res)=>{
 
})


// Unused for now

router.get('/architecture-admin', (req, res)=>{
    Architecture.find({}).then(architecture=>{
        res.status(200).json(architecture);
    });
});

router.get('/realisation-admin', (req, res)=>{
    RealisationEtSuivi.find({}).then(realisationEtSuivi=>{
        res.status(200).json(realisationEtSuivi);
    });
});

router.get('/plans-admin', (req, res)=>{
    PlanEtDessin.find({}).then(plan=>{
        res.status(200).json(plan);
    });
});





module.exports = router;
