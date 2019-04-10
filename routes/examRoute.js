const router = require('express').Router();
const examController = require('../controllers/exam')

router.route('/').get(examController.index);
router.route('/addExam').get(examController.addExam);
router.route('/roomExam').get(examController.roomExam);
router.route('/showroomExam').get(examController.showroomExam);
router.route('/manageExam').get(examController.manageExam);
module.exports = router;