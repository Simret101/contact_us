const express = require("express");
const router = express.Router();
const { validateContact } = require("../middleware/validateRequest");
const { handleContact } = require("../controllers/contactController");

// No rate limiter here; it's in the controller
router.post("/contact", validateContact, handleContact);

module.exports = router;
