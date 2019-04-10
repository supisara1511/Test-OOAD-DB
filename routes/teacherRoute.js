const router = require('express').Router();
const teacherController = require('../controllers/teacher');

router.route('/').get(teacherController.index);
router.route('/addTeacher').get(teacherController.addTeacher);
router.route('/addTeacher/submit').post(teacherController.insertTeacher);
router.route('/delete/:_id').get(teacherController.deleteTeacher);
router.route('/view/:_id').get(teacherController.viewDetail);

router.route('/edit/:_id').get(teacherController.viewEditDetail);
router.route('/edit/submit').post(teacherController.editTeacher);

module.exports = router;