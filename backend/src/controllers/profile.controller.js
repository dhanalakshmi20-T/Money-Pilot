const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    }

    catch (error) {
        console.error(error);
        
        return res.status(500).json({
            success: false,
            message: "Unable to fetch profile."
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: user
        });
    }

    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to update profile."
        });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image selected."
            });
        }

        const imagePath = `/uploads/profile/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                profileImage: imagePath
            },

            {
                new: true
            }
        ).select("-password");
        res.status(200).json({
            success: true,
            message: "Profile image updated.",
            data: user
        });
    }

    catch (error) {
        console.error(error);
        
        res.status(500).json({
            success: false,
            message: "Image upload failed"
        });
    }
};