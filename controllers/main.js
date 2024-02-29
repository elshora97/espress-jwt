const login = async (req, res) => {
  res.send("Fake Login Route");
};

const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: "hello,John",
    secret: `Here is your authorized data , your lucky Number is ${randomNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
