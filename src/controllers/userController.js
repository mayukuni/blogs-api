const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const authService = require('../services/authService');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await userService.create({ displayName, email, password, image });
    const token = await authService.login(email, password);
    res.status(201).json({ token });
    return user;
  },

  getAll: async (req, res) => {
    const token = req.headers.authorization;
    const validation = jwtService.validateToken(token);
    if (validation.error) {
      return res.status(validation.error.code).json(validation.error.message);
    }
    const users = await userService.getAll();
    res.status(200).json(users);
    // return users;
  },

  getById: async (req, res) => {
    const token = req.headers.authorization;
    const validation = jwtService.validateToken(token);
    if (validation.error) {
      return res.status(validation.error.code).json(validation.error.message);
    }
    const { id } = req.params;
    const user = await userService.getById(id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    res.status(200).json(user);
  },
};

module.exports = userController;