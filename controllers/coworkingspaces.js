const Reservation = require('../models/Reservation');
const Coworkingspace = require('../models/Coworkingspace');


// ==========================================
// @desc     Get all coworking spaces
// @route    GET /api/v1/coworkingspaces
// @access   Public
// ==========================================
exports.getCoworkingspaces = async (req, res, next) => {
    try {
        const reqQuery = { ...req.query };

        const removeFields = ['select', 'sort', 'page', 'limit'];
        removeFields.forEach(param => delete reqQuery[param]);

        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        let query = Coworkingspace
            .find(JSON.parse(queryStr))
            .populate({
                path: 'reservations',
                select: 'apptDate status user'
            });

        // Select
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const total = await Coworkingspace.countDocuments(JSON.parse(queryStr));

        query = query.skip(startIndex).limit(limit);

        const coworkingspaces = await query;

        const pagination = {};

        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }

        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        return res.status(200).json({
            success: true,
            count: coworkingspaces.length,
            pagination,
            data: coworkingspaces
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ==========================================
// @desc     Get single coworking space
// ==========================================
exports.getCoworkingspace = async (req, res, next) => {
    try {
        const coworkingspace = await Coworkingspace
            .findById(req.params.id)
            .populate('reservations');

        if (!coworkingspace) {
            return res.status(404).json({
                success: false,
                message: "Coworking space not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: coworkingspace
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// ==========================================
// @desc     Create coworking space
// ==========================================
exports.createCoworkingspace = async (req, res, next) => {
    try {
        const coworkingspace = await Coworkingspace.create(req.body);

        return res.status(201).json({
            success: true,
            data: coworkingspace
        });

    } catch (err) {
        console.error(err);

        // 🔥 Duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate field value entered. This coworking space already exists."
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message || "Invalid data"
        });
    }
};


// ==========================================
// @desc     Update coworking space
// ==========================================
exports.updateCoworkingspace = async (req, res, next) => {
    try {
        const coworkingspace = await Coworkingspace.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!coworkingspace) {
            return res.status(404).json({
                success: false,
                message: "Coworking space not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: coworkingspace
        });

    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate field value entered. Update would create duplicate."
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message || "Update failed"
        });
    }
};


// ==========================================
// @desc     Delete coworking space
// ==========================================
exports.deleteCoworkingspace = async (req, res, next) => {
    try {
        const coworkingspace = await Coworkingspace.findById(req.params.id);

        if (!coworkingspace) {
            return res.status(404).json({
                success: false,
                message: "Coworking space not found"
            });
        }

        // Delete related reservations
        await Reservation.deleteMany({
            coworkingspace: req.params.id
        });

        await coworkingspace.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Coworking space deleted successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};