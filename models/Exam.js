const mongoose = require('mongoose');

let examSchema = mongoose.Schema({
    name: String,
    exam_type: String,
    course: String,
    url: String,
    created_at: Date,
    updated_at: Date,
});

module.exports = mongoose.model('Exam', examSchema);