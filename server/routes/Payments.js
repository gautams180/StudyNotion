const express = require("express");
const router = express.Router();

const {
    capturePayment,
    verifySignature
} = require("../controllers/Payments");

router.post("/buycourse",capturePayment);
router.post("/verifypayment",verifySignature);

module.exports = router;