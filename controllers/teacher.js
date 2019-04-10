//Teacher Controller
const Teacher = require('../models/teacher');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
    index: async function(req, res) {
        Teacher.find({}, await
            function(err, result) {
                if (err) { console.log(err) }
                res.render('page/teacher', { result: result })
            });
    },

    addTeacher: function(req, res) {
        res.render('page/addTeacher');
    },

    insertTeacher: async function(req, res) {

        const newTeacher = new Teacher({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            position: req.body.position,
            phone: req.body.phone,
            email: req.body.email,
        });
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newTeacher.phone, salt);

        Teacher.findOne({ email: req.body.email }, function(err, person) {
                if (person) {
                    console.log('Email is already to use');
                    res.redirect('/teacher/addTeacher');

                } else {
                    newTeacher.save((err) => {

                        const newUser = new User({
                            username: newTeacher.email,
                            password: passwordHash,
                            type: "teacher",
                            id: newTeacher._id
                        })

                        newUser.save((err) => {
                            res.redirect('/teacher');
                        });
                    });

                }
            });
    },

    deleteTeacher: async function(req, res) {

        Teacher.findOne({ _id: req.params._id }, await
            function(err, teacher) {
                teacher.remove();
            });

        User.findOne({ id: req.params._id }, await
            function(err, user) {
                user.remove(() => {
                    res.redirect('/teacher');
                });

            });
    },

    viewDetail: async function(req, res) {
        Teacher.findOne({ _id: req.params._id }, await
            function(err, teacher) {
                res.render('page/viewTeacher', { result: teacher });
            });
    },


    viewEditDetail: async function(req, res) {
        Teacher.findOne({ _id: req.params._id }, await
            function(err, person) {
                res.render('page/editTeacher', { result: person });
            });
    },

    editTeacher: async function(req, res) {

        Teacher.findOne({ email: req.body.email }, await
            function(err, person) {
                if (person) {
                    person.firstname = req.body.firstname
                    person.lastname = req.body.lastname
                    person.address = req.body.address
                    person.phone = req.body.phone
                    person.position = req.body.position

                    person.save((err) => {
                        res.redirect('/teacher');
                    })
                }
            });
    }
}