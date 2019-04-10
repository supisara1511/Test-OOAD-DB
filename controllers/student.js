//Student Controller
const Student = require('../models/students');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
        index: async function(req, res) {
            Student.find({}, await
                function(err, result) {
                    if (err) { console.log(err) }
                    res.render('page/student', { result: result })
                });
        },

        addStudent: function(req, res) {
            res.render('page/addStudent');
        },

        insertStudent: async function(req, res) {

            const newStudent = new Student({
                id: req.body.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                faculty: req.body.faculty,
            });
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newStudent.id, salt);

            Student.findOne({ id: req.body.id }, function(err, person) {
                if (person) {
                    console.log('id is already to use');
                    res.redirect('/student/addStudent');
                } else {
                    newStudent.save((err) => {

                        const newUser = new User({
                            username: newStudent.id,
                            password: passwordHash,
                            type: "student",
                            id: newStudent._id
                        })

                        newUser.save((err) => {
                            console.log(newUser)
                            res.redirect('/student');
                        });
                    });

                }
            });
        },

        deleteStudent: async function(req, res) {
            Student.findOne({ _id: req.params._id }, await
                function(err, student) {
                    student.remove();
                });

            User.findOne({ id: req.params._id }, await
                function(err, user) {
                    user.remove();
                    res.redirect('/student');
                });
        },

        viewDetail: async function(req, res) {
            Student.findOne({ _id: req.params._id }, await
                function(err, student) {
                    res.render('page/viewStudent', { result: student });
                });
        },

        viewEditDetail: async function(req, res) {
            Student.findOne({ _id: req.params._id }, await
                function(err, student) {
                    res.render('page/editStudent', { result: student });
                });
        },

        editStudent: async function(req, res) {
            Student.findOne({ id: req.body.id }, await
                function(err, student) {
                    student.firstname = req.body.firstname,
                        student.lastname = req.body.lastname,
                        student.address = req.body.address,
                        student.phone = req.body.phone,
                        student.email = req.body.email,
                        student.faculty = req.body.faculty

                    student.save((err, data) => {
                        console.log(data);
                        res.redirect('/student');
                    });

                });
        },

    } 