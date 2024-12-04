<<<<<<< HEAD
const express=require("express")
const jwt=require("jsonwebtoken")
const router = new express.Router()
const Controller = require("../Controllers/controllers.js")
const Jwt_Secret="thisisseceret"

router.get("/test",(req,res)=>{
    res.send({
        name:"server is working"
    })
}) 
router.get('/genQuestions', Controller.genQuest)
router.get('/getQuestions', Controller.getQuestions);
router.get('/deleteQuestion', Controller.deleteQuestion);
router.get('/getStudents', Controller.getAllStudents)

router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.post('/addQuestion', Controller.addQuestion);
router.post('/updateQuestion', Controller.updateQuestion);
router.post('/registerStudent', Controller.addStudent);
router.post('/updateScore', Controller.updateLevelScore);
router.post('/studentLogin', Controller.loginStudent);


router.put('/students/:studentId/clear-score', Controller.clearScore);


router.delete('/students/:studentId', Controller.deleteStudent);

=======
const express=require("express")
const jwt=require("jsonwebtoken")
const router = new express.Router()
const Controller = require("../Controllers/controllers.js")
const Jwt_Secret="thisisseceret"

router.get("/test",(req,res)=>{
    res.send({
        name:"server is working"
    })
}) 
router.get('/genQuestions', Controller.genQuest)
router.get('/getQuestions', Controller.getQuestions);
router.get('/deleteQuestion', Controller.deleteQuestion);
router.get('/getStudents', Controller.getAllStudents)

router.post('/login', Controller.login);
router.post('/register', Controller.register);
router.post('/addQuestion', Controller.addQuestion);
router.post('/updateQuestion', Controller.updateQuestion);
router.post('/registerStudent', Controller.addStudent);
router.post('/updateScore', Controller.updateLevelScore);
router.post('/studentLogin', Controller.loginStudent);


router.put('/students/:studentId/clear-score', Controller.clearScore);


router.delete('/students/:studentId', Controller.deleteStudent);

>>>>>>> 089763f2c800b1537d4e03a1052f698eb45d58b4
module.exports = router