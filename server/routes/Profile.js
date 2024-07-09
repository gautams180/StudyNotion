const express = require("express");
const router = express.Router();

const {
    auth,
    isAdmin,
    isStudent,
    isInstructor
} = require("../middlewares/auth");

const {
    updateProfile,
    deleteAccount,
    getUserDetails,
    updateDisplayPicture
} = require("../controllers/Profile");

router.put("/updateProfile",auth,updateProfile);
router.delete("/deleteProfile",auth,deleteAccount);
router.get("/getUserDetails",auth,getUserDetails);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);


module.exports = router;