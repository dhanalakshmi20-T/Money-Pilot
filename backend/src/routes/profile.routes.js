const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");

const { getProfile, updateProfile, uploadProfileImage } = require("../controllers/profile.controller");

const upload = require("../middleware/upload.middleware");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.post("/upload-image", uploadProfileImage);

module.exports = router;