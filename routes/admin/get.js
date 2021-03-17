const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');
const RealisationEtSuivi = require('../../models/RealisationEtSuivi');



module.exports = function (router, dashboard_url) {

    router.get('/architecture-admin', (req, res) => {
        Architecture.find({}).then(architecture => {
            res.status(200).json(architecture);
        });
    });

    router.get('/realisation-admin', (req, res) => {
        RealisationEtSuivi.find({}).then(realisationEtSuivi => {
            res.status(200).json(realisationEtSuivi);
        });
    });

    router.get('/plans-admin', (req, res) => {
        PlanEtDessin.find({}).then(plan => {
            res.status(200).json(plan);
        });
    });

    router.get('/', (req, res) => {
        console.log(req.files);
        res.redirect(dashboard_url)
    });

    router.get('/offres-immobilier-admin', (req, res) => {
        Immobilier.find({}).then(imobilier => {
            res.json(imobilier);
        });
    });

}
