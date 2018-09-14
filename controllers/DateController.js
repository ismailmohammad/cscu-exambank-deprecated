class DateController {
    static createdAtToISOHelper(obj) {
        return new Date(obj.created_at).toISOString();
    }

    static updatedAtToISOHelper(obj) {
        return new Date(obj.updated_at).toISOString();
    }

    static version(req, res) {
        res.send(version);
    }
}

module.exports = DateController;