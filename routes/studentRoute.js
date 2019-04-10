const router = require('express').Router();
const studentController = require('../controllers/student');

router.route('/').get(studentController.index);
router.route('/addStudent').get(studentController.addStudent);
router.route('/addStudent/submit').post(studentController.insertStudent);
router.route('/delete/:_id').get(studentController.deleteStudent);
router.route('/view/:_id').get(studentController.viewDetail);

router.route('/edit/:_id').get(studentController.viewEditDetail);
router.route('/edit/submit').post(studentController.editStudent);

module.exports = router;