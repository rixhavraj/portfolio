import { generateToken } from "../../../backand/config/utils.js";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      alert("User not found");
      console.log("email not exist");
      return res.status(400).json({ message: "invalid email" });
    }
    const passwordcorrect = await bcrypt.compare(password, user.password);
    if (!passwordcorrect) {
      alert("Invalid password");
      console.log("invalid password");
      return res.status(400).json({ message: "wrong password" });
    }
    generateToken(user._id, res);
    res
      .status(200)
      .json({ _id: user._id, fullName: user.fullName, email: user.email });
  } catch (error) {
    console.log("internal server error", error.message);
    res.status(500).json({messgae:"interal sever error"});
  }
};
