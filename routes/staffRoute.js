const router = require('express').Router();
const staffController = require('../controllers/staff');

router.route('/').get(staffController.index);

//page add staff
router.route('/addStaff').get(staffController.addStaff);
router.route('/addStaff/submit').post(staffController.insertStaff);

//delete staff
router.route('/delete/:_id').get(staffController.deleteStaff);

//view detail staff
router.route('/view/:_id').get(staffController.viewDetail);

router.route('/edit/:_id').get(staffController.viewEditDetail);
router.route('/edit/submit').post(staffController.editStaff);

module.exports = router;


