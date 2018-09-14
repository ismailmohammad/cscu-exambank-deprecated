const Rule = require('./lib/Rule');
const Exam = require('../models/Exam');
// const Course = require('../models/Course');

class ExamListRule extends Rule {
    /**
     * Check if request can list exams (This should be available to only CS students, profs, and admins)
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(request, data) {
        return new Promise((resolve, reject) => {
            if (request.master) {
                return resolve({ _id: data.id });
            } else if (request.admin) {
                Exam.findOne({ _id: data.id })
                    .then(exam => {
                        if (exam) {
                            return resolve();
                        } else {
                            throw new Error("ExamNotFound");
                        }
                    })
            } else {
                reject("ForbiddenByExamListRule");
            }
        })
    }
}

module.exports = ExamListRule;