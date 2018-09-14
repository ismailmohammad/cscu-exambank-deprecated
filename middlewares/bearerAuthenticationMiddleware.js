/**
 * UNLICENSED
 * Middleware to check authentication status (Right Now Authentication is not implemented)
 * Admin in this case would be either CSCU admins and/or professors based on which path is taken.
 * Right now this is based on a previous project I have worked on, however for Ryerson, storing said tokens would most likely be a security risk
 * I would have to get acquainted with the Ryerson authentication module first tbh.
 */

module.exports = function(models) {
    return function(req, res, next) {
        req.models = models;
        if (req.header('authorization')) {
            // models.AdminToken.findOne({ body: req.header('authorization') })
            //     .then(admin => {
            //         if (admin) req.admin = admin;
            //         next();
            //     })
            //     .catch(() => {
            //         // If not authenticated as employee, try customer
            //         models.StudentToken.findOne({ body: req.header('authorization') })
            //             .then(student => {
            //                 if (student) req.student = student;
            //                 next();
            //             })
            //             .catch(() => {
            //                 next();
            //             })
            //     })
        } else {
            next();
        }
    }
};