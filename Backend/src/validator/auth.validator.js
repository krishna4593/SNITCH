import { body, validationResult } from "express-validator";

const registerValidationRules = [
	body("fullname")
		.trim()
		.notEmpty()
		.withMessage("Full name is required")
		.isLength({ min: 5 })
		.withMessage("Full name must be at least 5 characters long"),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.normalizeEmail(),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),

	body("contact")
		.trim()
		.notEmpty()
		.withMessage("Contact number is required")
		.matches(/^\+?[0-9]{7,15}$/)
		.withMessage("Please provide a valid contact number"),

	body("role")
		.optional()
		.isBoolean()
		.withMessage("Role must be true (seller) or false (buyer)"),
];

export const registerValidator = async (req, res, next) => {
	await Promise.all(registerValidationRules.map((rule) => rule.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		});
	}

	next();
};

const loginValidationRules = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.normalizeEmail(),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const loginValidator = async (req, res, next) => {
	await Promise.all(loginValidationRules.map((rule) => rule.run(req)));

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: errors.array(),
		});
	}

	next();
};
