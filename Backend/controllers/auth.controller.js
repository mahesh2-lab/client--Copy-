import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/genrateToken.js";

export const signup = async (req, res) => {
  try {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const { firstName, lastName, email, password, confirmPassword, gender } = req.body;
    

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Password do not match" });
    }
    if (!validRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const boyProilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;
    const girlProilePic = `https://avatar.iran.liara.run/public/girl?username=${email}`;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProilePic : girlProilePic,
    });

    if (newUser) {
      genrateTokenAndSetCookie(res, newUser._id);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ msg: "User not created" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("error in signup", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    
    const user = await User.findOne({email});

    const isPasswordCoreect = await bycrypt.compare(password, user?.password || '');
    

    if (!user || !isPasswordCoreect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    genrateTokenAndSetCookie(res, user._id);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("error in login", error);
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', "", { maxAge: 0 });
    res.status(200).json({ msg: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("error in login", error);
  }
};
