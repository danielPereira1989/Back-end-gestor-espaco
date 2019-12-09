const router = require('express').Router();
const controllerSpaceManager = require('../controllers/spaceManager.controller.js');
const controllerSponser = require('../controllers/sponsers.controller.js');
const controllerMaterials = require('../controllers/materials.controller.js');
const controllerTrack = require('../controllers/track.controller.js');
const controllerSpace = require('../controllers/space.controller.js');
//const controllerMail = require('../controllers/mail.controller.js');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
router.get('/', function(req, res) {
    res.send("PW");
    res.end();
});
router.get('/spaceManager/', controllerSpaceManager.read);
router.get('/spaceManager/:id', controllerSpaceManager.readID); 
router.post('/spaceManager/', controllerSpaceManager.save); 
router.put('/spaceManager/', controllerSpaceManager.update);
//router.put('/spaceManager/del/:id', controllerSpaceManager.deleteL)
router.delete('/spaceManager/:id', controllerSpaceManager.deleteF);

router.get('/sponsers/', controllerSponser.read);
router.get('/sponsers/:id', controllerSponser.readID);
router.post('/sponsers/', controllerSponser.save);
router.put('/sponsers/', controllerSponser.update);
//router.put('/sponsers/del/:id', controllerSponser.deleteL);
router.delete('/sponsers/:id', controllerSponser.deleteF);

router.get('/materials/', controllerMaterials.read);
router.get('/materials/:id', controllerMaterials.readID);
router.post('/materials/', controllerMaterials.save);
router.put('/materials/', controllerMaterials.update);
router.put('/materials/del/:id', controllerMaterials.deleteID);
/*
router.get('/track/', controllerTrack.read);
router.get('/track/:id', controllerTrack.readID);
router.post('/track/', controllerTrack.save);
router.put('/track/', controllerTrack.update);
router.put('/track/del/:id', controllerTrack.deleteL);
router.delete('/track/:id', controllerTrack.deleteF);


router.get('/space/', controllerSpace.readSpace);
router.get('/space/:id', controllerSpace.readIDSpace);

router.get('/space/ : idspace/spacemanager', controllerSpace.readSpaceManager );
router.post('/space/ : idspace/spacemanager/:idspacemanager/', controllerSpace.saveSpaceManager );
router.delete('/space/ : idspace/spacemanager/:idspacemanager/', controllerSpace.deleteSpaceManager );

router.get('/space/ : idspace/sponsor', controllerSpace.readSponsor );
router.post('/space/ : idspace/sponsor/:idsponsor/', controllerSpace.saveSponsor );
router.delete('/space/ : idspace/sponsor/:idsponsor/', controllerSpace.deleteSponsor );

router.get('/space/ : idspace/track', controllerSpace.readTrack );
router.post('/space/ : idspace/track/:idtrack/', controllerSpace.saveTrack);
router.delete('/space/ : idspace/track/:idtrack/', controllerSpace.deleteTrack );

router.get('/space/ : idspace/materials', controllerSpace.readMaterials );
router.post('/space/ : idspace/materials/:idmaterials/', controllerSpace.saveMaterials );
router.delete('/space/ : idspace/materials/:idmaterials/', controllerSpace.deleteMaterials );
*/

module.exports = router;

