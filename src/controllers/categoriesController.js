const categoriesService = require('../services/categoriesService');
const jwtService = require('../services/jwtService');

const categoriesController = {
  create: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwtService.validateToken(token);
    if (validatedToken.error) {
      return res
        .status(validatedToken.error.code)
        .json(validatedToken.error.message);
    }
    const validatedBody = jwtService.validateCategory(req.body);
    if (validatedBody.error) {
      return res
        .status(validatedBody.error.code)
        .json(validatedBody.error.message);
    }
    const result = await categoriesService.create(validatedBody);
    res.status(201).json(result);
  },

  getAll: async (req, res) => {
    const token = req.headers.authorization;
    const validation = jwtService.validateToken(token);
    if (validation.error) {
      return res.status(validation.error.code).json(validation.error.message);
    }
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  }, 
};

module.exports = categoriesController;