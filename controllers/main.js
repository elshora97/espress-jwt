const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and passward", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token: token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Invalid Token", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello,${decoded.username}`,
      secret: `Here is your authorized data , your lucky Number is ${randomNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("unauthorized to access this route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
