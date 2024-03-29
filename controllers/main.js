const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors/index");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequest("Please provide username and passward");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User Created", token: token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const randomNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `hello,${req.user.username}`,
    secret: `Here is your authorized data , your lucky Number is ${randomNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
