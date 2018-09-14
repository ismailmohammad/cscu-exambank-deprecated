module.exports = (req, res, next) => {
    // Temporary Mock authentication Framework - DEMO ONLY DO NOT USE IN PROD
    if(req.header('authorization') === process.env.MASTER_TOKEN){
        req.master = true;
    } else if (req.header('authorization') === process.env.ADMIN_TOKEN) {
        req.admin = true;
    } else if (req.header('authorization') === process.env.STUDENT_TOKEN) {
        req.student;
    } else {
        // Do Nothing
    }
    return next();
};