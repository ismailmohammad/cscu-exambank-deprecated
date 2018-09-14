const Rule = require('./lib/Rule');
const Exam = require('../models/Exam');
// const Course = require('../models/Course');

class ExamDeleteRule extends Rule {
    /**
     * Check if request can perform Exam deletion
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
                        // Ideally we'd be checking if the admin belongs to the course? in the final version?
                        if (exam) {
                            return resolve();
                        } else {
                            throw new Error("ExamNotFound");
                        }
                    })
            } else {
                reject("ForbiddenByExamDeleteRule");
            }
        })
    }
}

module.exports = ExamDeleteRule;