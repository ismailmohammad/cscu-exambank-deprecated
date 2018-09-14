const ExamGate = require('../gates/ExamGate');

module.exports = (req, res, next) => {
    req.gates = {
        ExamGate
    };
    return next();
};