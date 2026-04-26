import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			
			trim: true,
		},
		password: {
			type: String,
			required: true,
			
		},
		contact: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ["buyer", "seller"],
			default: "buyer",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return ;
	}

	this.password = await bcrypt.hash(this.password, 10);
	
});

userSchema.methods.comparePassword = async function (plainPassword) {
	return bcrypt.compare(plainPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;

