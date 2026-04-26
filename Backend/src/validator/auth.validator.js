import { body, validationResult } from "express-validator";

const registerValidationRules = [
	body("fullname")
		.trim()
		.notEmpty()
		.withMessage("Full name is required")
		.isLength({ min: 2 })
		.withMessage("Full name must be at least 2 characters long"),

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
		.customSanitizer((value) => String(value).replace(/[^0-9+]/g, ""))
		.matches(/^\+?[0-9]{7,15}$/)
		.withMessage("Please provide a valid contact number"),

	body("isSeller")
		.optional()
		.customSanitizer((value) => {
			if (value === undefined || value === null || value === "") {
				return false;
			}

			if (typeof value === "boolean") {
				return value;
			}

			if (value === 1 || value === "1" || value === "true") {
				return true;
			}

			if (value === 0 || value === "0" || value === "false") {
				return false;
			}

			return value;
		})
		.isBoolean()
		.withMessage("isSeller must be true (seller) or false (buyer)")
		.toBoolean(),
];

export const registerValidator = async (req, res, next) => {
	if (req.body?.isSeller === undefined && req.body?.role !== undefined) {
		const roleValue = String(req.body.role).toLowerCase();

		if (roleValue === "seller") {
			req.body.isSeller = true;
		} else if (roleValue === "buyer") {
			req.body.isSeller = false;
		} else {
			req.body.isSeller = req.body.role;
		}
	}

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
