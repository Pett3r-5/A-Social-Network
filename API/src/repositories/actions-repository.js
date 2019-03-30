const User = require('../models/user')

exports.get = (query) => {
  return User.find(query).toArray()
}
