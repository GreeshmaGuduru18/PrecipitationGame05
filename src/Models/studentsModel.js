const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  level1Score: {
    type: String,
    required: false,
    default: "0"
  },
  level2Score: {
    type: String,
    required: false,
    default: "0"
  },
  level3Score: {
    type: String,
    required: false,
    default: "0"
  }
}, { timestamps: true });

//Professordef function for authentication
studentSchema.statics.findByCredentials = async (email,password) => {
    const user = await Student.findOne({ email })
   // console.log(user, email)
    if(!user){
        throw new Error("Email not found")
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
        throw new Error("password is incorrect")
    } else{
        return user
    }
}

//using mongoose middleware for hashing passwords
studentSchema.pre("save",async function (next) {
    const user = this
    console.log("Student data received")
   if(user.isModified('password')){
       user.password=await bcrypt.hash(user.password,8)
   }
    next()
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
