const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  // Get token
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('Invalid token', 401)
  }

  const token = authHeader.split(' ')[1]

  // Validate token
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decodedData
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
