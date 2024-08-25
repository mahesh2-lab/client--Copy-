import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    try {
        const logedInUserId = req.user._id;

        const user = await User.find(logedInUserId).select("-password");

        res.status(200).json(user);

    } catch (error) {
        console.log("error in getUser ", error);
        return res.status(500).json({ message: error.message });
    }
};
