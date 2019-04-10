const ExcelReader = require('node-excel-stream').ExcelReader;
const Teacher = require('../models/teacher');
const Student = require('../models/students');
const Year = require('../models/year');
const Course = require('../models/course');

module.exports = {
    index: async function (req, res) {
        var year = await Year.findOne({ type: 'on' });
        var course = await Course.find().populate('teacher');
        
        res.render('page/course', { resultYeat: year , result : course});
    },

    addCourse: async function (req, res) {
        const newCourse = new Course({
            year: req.body.year,
            term: req.body.term,
            idSubject: req.body.idSubject,
            subject: req.body.subject,
        })

        newCourse.save((err)=>{
            res.redirect('/course');
        })

    },

    addDetailCourse: async function (req, res) {
        var year = await Year.findOne({ type: 'on' })
        var teacher = await Teacher.find()
        var student = await Student.find()
        var course = await Course.findOne({ _id :  req.params._id }).populate('teacher').populate('student');
        
        res.render('page/addCourse', { resultYeat: year, 
                                       resultTeacher: teacher, 
                                       resultStudent: student, 
                                       resultCourse : course,
                                       _idSubject : req.params._id
                                    });
    },

    addTeacherCourse:async function (req, res) {
     
        Course.findOne({_id : req.params._id} , await function(err, person){
            person.teacher = req.body.check
            
            person.save((err) =>{
                if(err){console.log(err)}
                res.redirect('/course/addCourse/'+req.params._id+'');
            })

        });

    },

    addStudentCourse:async function (req, res) {
        console.log(req.body.check);
        
        Course.findOne({_id : req.params._id} , await function(err, person){
            person.student = req.body.check
            
            person.save((err) =>{
                if(err){console.log(err)}
                res.redirect('/course/addCourse/'+req.params._id+'');
            })

        });

    },


    uploadStudent: async function(req,res){
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log(fieldname);

            if (fieldname == "student") {
                let fileStudent = file;
                let reader = new ExcelReader(fileStudent, {
                    sheets: [{
                        name: 'Sheet1',
                        rows: {
                            headerRow: 1,
                            allowedHeaders: [{
                                name: 'student_id',
                                key: 'student_id'
                            }, {
                                name: 'firstname',
                                key: 'firstname'
                            }, {
                                name: 'lastname',
                                key: 'lastname'
                            }, {
                                name: 'email',
                                key: 'email'
                            }]
                        }
                    }]
                })

                console.log('starting parse : ' + fieldname);
                reader.eachRow(async (rowData, rowNum, sheetSchema) => {
                        console.log(rowData);
                        let student = new Student(rowData);

                        await student.save();
                    })
                    .then(() => {
                        console.log('done parsing : ' + fieldname);
                    });
            }

        

        }); 
    }
    






}