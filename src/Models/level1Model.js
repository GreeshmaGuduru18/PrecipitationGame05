<<<<<<< HEAD
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: false,
        unique: true,
        index: true
    },
    set: {
        type: Number,
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

questionSchema.pre('save', async function(next) {
    if (!this.questionNumber) {
        const latestQuestion = await this.constructor.findOne().sort('-questionNumber');
        this.questionNumber = latestQuestion ? latestQuestion.questionNumber + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Level1Question', questionSchema);
=======
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: false,
        unique: true,
        index: true
    },
    set: {
        type: Number,
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

questionSchema.pre('save', async function(next) {
    if (!this.questionNumber) {
        const latestQuestion = await this.constructor.findOne().sort('-questionNumber');
        this.questionNumber = latestQuestion ? latestQuestion.questionNumber + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Level1Question', questionSchema);
>>>>>>> 089763f2c800b1537d4e03a1052f698eb45d58b4
