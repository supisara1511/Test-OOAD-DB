// Staff Controller
const Staff = require('../models/staff');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
        index: async function(req, res) {
            Staff.find({}, await
                function(err, result) {
                    if (err) { console.log(err) }
                    res.render('page/staff', { result: result });
                });

        },

        addStaff: function(req, res) {
            res.render('page/addStaff');
        },

        insertStaff: async function(req, res) {
            const newStaff = new Staff({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                birthday: req.body.birthday,
                position: req.body.position,
                phone: req.body.phone,
                email: req.body.email,
            });
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newTeacher.phone, salt);

            Staff.findOne({ email: req.body.email },
                function(err, person) {
                    if (person) {
                        console.log('email is already to use');
                        res.redirect('/staff/addStaff');
                    } else {
                        newStaff.save((err) => {
                            // console.log(newStudent);
                            const newUser = new User({
                                username: newStaff.email,
                                password: passwordHash,
                                type: "staff",
                                id: newStaff._id
                            })

                            newUser.save((err) => {
                                res.redirect('/staff');
                            });
                        });

                    }
                });
        },

        deleteStaff: async function(req, res) {

            Staff.findOne({ _id: req.params._id }, await
                function(err, staff) {
                    staff.remove();
                });

            User.findOne({ id: req.params._id }, await
                function(err, user) {
                    user.remove(() => {
                        res.redirect('/staff');
                    });

                });
        },
        viewDetail: async function(req, res) {
            Staff.findOne({ _id: req.params._id }, await
                function(err, staff) {
                    res.render('page/viewStaff', { result: staff });
                });
        },

        viewEditDetail: async function(req, res) {
            console.log(req.params._id);

            Staff.findOne({ _id: req.params._id }, await
                function(err, person) {
                    res.render('page/editStaff', { result: person });
                });
        },

        editStaff: async function(req, res) {
            console.log(req.body.email);

            Staff.findOne({ email: req.body.email }, await
                function(err, person) {
                    if (person) {
                        person.firstname = req.body.firstname
                        person.lastname = req.body.lastname
                        person.address = req.body.address
                        person.phone = req.body.phone
                        person.position = req.body.position

                        person.save((err) => {
                            res.redirect('/staff');
                        })
                    }
                });
        }


    }