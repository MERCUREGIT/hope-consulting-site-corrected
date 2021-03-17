const { isEmpty, uploadDir } = require('../../helpers/upload-helper');
const Immobilier = require('../../models/Immobilier');
const Architecture = require('../../models/Architecture');
const PlanEtDessin = require('../../models/PlanEtDessin');

const RealisationEtSuivi = require('../../models/RealisationEtSuivi');
const dashboard_url = "https://hope-consulting-dashboard.netlify.app/";

module.exports = function (router, fs, dashboard_url) {
    function deleteStaticFiles(model, id) {
        console.log(id);
        model.findOne({_id: id }).then(instance=>{
            fs.unlink(uploadDir + instance.file, err => {});
            instance.remove();
        });
    }
    router.delete('/architectures/:id', async function  (req, res)   {
        try {
            await deleteStaticFiles(Architecture, req.params.id)
                res.redirect(dashboard_url);
        } catch (error) {
            console.log(err);
        }
    });

    router.delete('/realisations/:id', async function  (req, res)   {
        try {
            await deleteStaticFiles(RealisationEtSuivi, req.params.id)
                res.redirect(dashboard_url);
        } catch (error) {
            console.log(err);
        }
    });

    router.delete('/plans/:id', async function  (req, res)   {
        try {
            await deleteStaticFiles(PlanEtDessin, req.params.id)
                res.redirect(dashboard_url);
        } catch (error) {
            console.log(err);
        }
    });
    
    router.delete('/denyGroundOffer/:id', (req, res)=>{
        Immobilier.findOne({_id: req.params.id }).then(immobilier=>{
            fs.unlink(uploadDir + immobilier.file, err => {});
            immobilier.remove();
            res.redirect(dashboard_url);
        });
    });
    
    
}