const router = require('express').Router();
const buildingController = require('../controllers/building')

router.route('/').get(buildingController.index);

//insert building
router.route('/addBuilding').get(buildingController.addBuilding);
router.route('/addBuilding/submit').post(buildingController.insertBuilding)
//---------------

//view detail building
router.route('/view/:id').get(buildingController.viewDetail);
//--------------------

//delete building
router.route('/delete/:id').get(buildingController.deleteBuilding);
//---------------

//edit detail building
router.route('/edit/:id').get(buildingController.viewEditDetail);
router.route('/edit/submit/:id').post(buildingController.editBuilding);
//--------------------


// <---- Room ---->

//insert room
router.route('/addRoom/submit/:id').post(buildingController.insertRoom)

//remove room

//edit room


module.exports = router;