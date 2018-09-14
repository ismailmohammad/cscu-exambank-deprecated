const Gate = require('./lib/Gate');

// Rules
const ExamCreateRule = require('../rules/ExamCreateRule');
const ExamUpdateRule = require('../rules/ExamUpdateRule');
const ExamDeleteRule = require('../rules/ExamDeleteRule');
const ExamListRule = require('../rules/ExamListRule');

class ExamGate extends Gate {
    /**
     * Check if request can perform an action
     * @param action
     * @param request
     * @param data
     * @returns {Promise<any>}
     */
    static can(action, request, data) {
        switch (action) {
            case "create":
                return ExamCreateRule.can(request, data);
            case "update":
                return ExamUpdateRule.can(request, data);
            case "delete":
                return ExamDeleteRule.can(request, data);
            case "list":
                return ExamListRule.can(request, data)
            default:
                return new Promise((resolve, reject) => reject());
        }
    }
}

module.exports = ExamGate;