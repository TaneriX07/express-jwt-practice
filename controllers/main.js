const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

// Check username and password in the POST request (login/register)
// If both field exist, create a new JWT and send it to the front-end
// Setup authentication so only request with JWT can access the dashboard
const login = async (req, res) => {
  const { username, password } = req.body

  // Validation
  if (!username || !password) {
    throw new BadRequestError('Please provide both email and password')
  }

  // Dummy ID
  const id = new Date().getDate()

  // Generate token
  // Secret have to be long and complex in production
  // Since this is just a test, I decide to keep it simple
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'User created', token })
}

const dashboard = async (req, res) => {
  const num = Math.floor(Math.random() * 100)
  res
    .status(200)
    .json({ msg: `Hello, ${req.user.username}`, secretNumber: num })
}

module.exports = { login, dashboard }
