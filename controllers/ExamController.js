// Mongoose models
const Exam = require('../models/Exam');

// Gates
const ExamGate = require('../gates/ExamGate');

// Validators
// const CreateExamInputValidator = require('../validators/CreateExamInputValidator');
// const UpdateExamInputValidator = require('../validators/UpdateExamInputValidator');

/**
 * ExamController
 */
class ExamController {
    /**
     * Create a new exam
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static create(obj, args, context) {
        return new Promise((resolve, reject) => {
            ExamGate.can("create", context, args)
                // .then(() => {
                //     return CreateExamInputValidator.validate(args.exam);
                // })
                .then(() => {
                    let exam = new Exam({
                        ...args.exam,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    return exam.save();
                })
                .then(exam => {
                    resolve(exam);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    /**
     * Update an existing Exam
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static update(obj, args, context) {
        return new Promise((resolve, reject) => {
            let exam = null;
            ExamGate.can("update", context, args)
                .then(() => {
                    return Exam.findOne({ _id: args.id });
                })
                .then(result => {
                    if (!result) {
                        throw new Error("ExamNotFound");
                    }
                    exam = result;
                    // return UpdateExamInputValidator.validate(exam.choices, args.exam);
                    return true; // For now
                })
                .then(() => {
                    if (args.exam.is_topping) {
                        if (!args.exam.max_choice) {
                            throw new Error("MaxChoiceRequiredForTopping");
                        }
                        if (args.exam.max_choice < 1) {
                            throw new Error("InvalidMaxChoice");
                        }
                    } else {
                        args.exam.max_choice = 1;
                    }
                })
                .then(() => {
                    exam.set({
                        ...args.exam,
                        updated_at: new Date()
                    });
                    return exam.save();
                })
                .then(result => {
                    resolve(result);
                })
                .catch(e => {
                    reject(e);
                })
        })
    }

    /**
     * Delete an existing Exam
     * @param obj
     * @param args
     * @param context
     * @returns {Promise<any>}
     */
    static delete(obj, args, context) {
        return new Promise((resolve, reject) => {
            ExamGate.can("delete", context, args)
                .then(() => {
                    return Exam.findOne({ _id: args.id });
                })
                .then(exam => {
                    if (exam) {
                        return exam.remove();
                    }
                    throw new Error("ExamNotFound");
                })
                .then(() => {
                    resolve("Removed");
                })
                .catch(e => {
                    reject(e);
                })
        })
    }
}

module.exports = ExamController;