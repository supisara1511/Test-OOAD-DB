//Exam Controller

module.exports = {
    index: function(req,res){
        res.render('page/exam');
    },
    addExam: function(req,res){
        res.render('page/addExam');
    },
    roomExam: function(req,res){
        res.render('page/roomExam');
    },
    showroomExam: function(req,res){
        res.render('page/showroomExam');
    },
    manageExam: function(req, res){
        res.render('page/manageExam');
    }
}