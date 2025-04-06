const { check, validationResult } = require("express-validator");

exports.validateContact = [

  check("email").isEmail().withMessage("Invalid email format"),

  
  check("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters long"),

 
  check("message")
    .notEmpty().withMessage("Message cannot be empty")
    .isLength({ min: 2 }).withMessage("Message must be at least 2 characters long"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({ field: err.param, message: err.msg })),
      });
    }

    next();
  },
];
