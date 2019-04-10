const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcryptjs');
const busboy = require('busboy')
const port = 7078
const auth = require('./auth/auth');


mongoose.connect('mongodb://perthdm:123456d@ds115340.mlab.com:15340/exam')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(busboy({immediate:true}));

app.use(bodyParser.json())
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false
  }));
app.set('view engine', 'ejs')


app.get('/home',  (req, res) => { res.render('page/home') })

app.use('/', require('./routes/loginRoute'))
app.use('/student' ,  require('./routes/studentRoute'))
app.use('/teacher', require('./routes/teacherRoute'))
app.use('/staff', require('./routes/staffRoute'))
app.use('/building', require('./routes/buildingRoute'))
app.use('/exam', require('./routes/examRoute'))
app.use('/year', require('./routes/yearRoute'))
app.use('/course', require('./routes/courseRoute'))

app.listen(port, () => {
    console.log('Running at port: ' + port)
})

