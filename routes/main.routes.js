const router = require('express').Router();
const controllerSpaceManager = require('../controllers/spaceManager.controller.js');
const controllerSponser = require('../controllers/sponser.controller.js');
const controllerSponserShip = require('../controllers/sponsership.controller.js');
const controllerMaterials = require('../controllers/materials.controller.js');
const controllerTrack = require('../controllers/track.controller.js');
const controllerSpace = require('../controllers/space.controller.js');
const controllerScheduleTrack = require('../controllers/schedule_track.controller.js');
const controllerTypeTrack = require('../controllers/type_track.controller');


const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
router.get('/', function(req, res) {
    res.send("PW");
    res.end();
});


router.get('/sponser/', controllerSponser.read);
router.get('/sponser/:id', controllerSponser.readID);
router.post('/sponser/', controllerSponser.save);
router.put('/sponser/del/:id', controllerSponser.deleteLogico);

router.get('/sponsership/', controllerSponserShip.read);
router.get('/sponsership/:id', controllerSponserShip.readID);
router.post('/sponsership/', controllerSponserShip.save);
router.put('/sponsership/del/:id', controllerSponserShip.deleteLogico);

router.get('/materials/', controllerMaterials.read);
router.get('/materials/:id', controllerMaterials.readID);
router.post('/materials/', controllerMaterials.save);
router.put('/materials/del/:id',controllerMaterials.deleteLogico);


router.get('/track/', controllerTrack.read);
router.post('/track/', controllerTrack.save);
router.get('/track/:id', controllerTrack.readID);
router.get('/trackreadAll/', controllerTrack.readAll);
router.put('/track/del/:id', controllerTrack.deleteLogico);
//router.put('/track/', controllerTrack.update);

router.get('/space/', controllerSpace.read );
router.get('/space/:id', controllerSpace.readID);
router.post('/space/', controllerSpace.save );
router.put('/space/:id', controllerSpace.update);
router.put('/space/del/:id', controllerSpace.deleteLogico);


router.get('/schedule_track/' , controllerScheduleTrack.read);
router.get('/schedule_track/:id' , controllerScheduleTrack.readID);
router.post('/schedule_track', controllerScheduleTrack.save);
router.put('/schedule_track/del/:id', controllerScheduleTrack.deleteLogico);

router.get('/type_track/' , controllerTypeTrack.read);
router.get('/type_track/:id' , controllerTypeTrack.readID);
router.post('/type_track', controllerTypeTrack.save);
router.put('/type_track/del/:id', controllerTypeTrack.deleteLogico);


module.exports = router;

