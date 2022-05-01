const login = async (req, res) => {
  res.send('Fake login/register/signup route')
}

const dashboard = async (req, res) => {
  const num = Math.floor(Math.random() * 100)
  res.status(200).json({ msg: `Hello, Vincent`, secretNumber: num })
}

module.exports = { login, dashboard }
