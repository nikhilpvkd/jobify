import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../modals/User.js";
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please fill all the feilds");
    }

    // checking if useremail alredy registered
    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
        throw new BadRequestError("email already exist!");
    }

    //creating a new user
    const user = await User.create({ name, email, password });
    const token = await user.createJwt();

    res.status(201).json({
        status: "success",
        message: "user created successfully",
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
        },
        token: token,
        location: user.location,
    });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("please Provide all values");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new BadRequestError("invalid user");
    }

    const isCorrect = await user.comparePassword(password);

    if (!isCorrect) {
        throw new UnauthenticatedError("invalid credentials");
    }

    const token = user.createJwt();
    user.password = undefined;

    res.status(200).json({
        status: "success",
        message: "user logged in successfully",
        token,
        user,
        location: user.location,
    });
};

export const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;

    if (!email || !name || !lastName || !location) {
        throw new BadRequestError("please fill all the fields");
    }
    const user = await User.findOne({ _id: req.user.userId });

    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;

    await user.save();
    const token = user.createJwt();
    res.status(200).json({
        user,
        token,
        location: user.location,
    });
};

export const deleteUser = (req, res) => {
    res.send("user deleted successfully");
};
