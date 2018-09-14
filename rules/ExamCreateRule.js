const Rule = require('./lib/Rule');

class ExamCreateRule extends Rule {
    /**
     * Check if request can perform Exam creation
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(request, data) {
        return new Promise((resolve, reject) => {
            if (request.master) {
                return resolve();
            } else if (request.admin) {
                // Ideally we'd be checking if the admin belongs to the course? in the final version
                return resolve();
            } else {
                return reject("ForbiddenByExamCreateRule");
            }
        })
    }
}

module.exports = ExamCreateRule;