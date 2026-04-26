import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const createToken = (userId) => {
	return jwt.sign({ id: userId }, config.jwtSecret, {
		expiresIn: config.jwtExpiresIn,
	});
};

const sendToken = (user, res, statusCode, message) => {
	const token = createToken(user._id);

	res.cookie("token", token, {
		httpOnly: true,
		secure: config.nodeEnv === "production",
		sameSite: "lax",
		maxAge: config.cookieExpireMs,
	});

	return res.status(statusCode).json({
		success: true,
		message,
		token,
		user: {
			id: user._id,
			fullname: user.fullname,
			email: user.email,
			contact: user.contact,
			role: user.role,
		},
	});
};

export const registerUser = async (req, res) => {
	try {
		const { password, isSeller } = req.body;
		const fullname = String(req.body.fullname).trim();
		const email = String(req.body.email).trim().toLowerCase();
		const contact = String(req.body.contact).trim();
		const sellerFlag =
			isSeller === true || isSeller === "true" || isSeller === 1 || isSeller === "1";

		const existingUser = await userModel.findOne({
			$or: [{ email }, { contact }],
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User with this email or contact number already exists",
			});
		}

		const newUser = await userModel.create({
			fullname,
			email,
			password,
			contact,
			role: sellerFlag ? "seller" : "buyer",
		});

		return sendToken(newUser, res, 201, "User registered successfully");
	} catch (error) {
		if (error?.code === 11000) {
			const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";
			return res.status(409).json({
				success: false,
				message: `${duplicateField} already exists`,
			});
		}

		if (error?.name === "ValidationError") {
			const firstError = Object.values(error.errors || {})[0];
			return res.status(400).json({
				success: false,
				message: firstError?.message || "Invalid registration data",
			});
		}

		return res.status(500).json({
			success: false,
			message: "Registration failed",
			error: error.message,
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await userModel.findOne({ email: email});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const isPasswordMatched = await user.comparePassword(password);

		if (!isPasswordMatched) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		return sendToken(user, res, 200, "Login successful");
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Login failed",
			error: error.message,
		});
	}
};
