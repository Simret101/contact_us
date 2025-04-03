const { check, validationResult } = require("express-validator");

exports.validateContact = [

  check("email").isEmail().withMessage("Invalid email format"),

  check("subject").notEmpty().withMessage("Subject is required"),

  check("message").notEmpty().withMessage("Message cannot be empty"),

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
