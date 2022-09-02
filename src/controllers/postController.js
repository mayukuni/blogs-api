const postService = require('../services/postService');
const jwtService = require('../services/jwtService');

const postController = {
    getAll: async (req, res) => {
        const token = req.headers.authorization;
        const validation = jwtService.validateToken(token);
        if (validation.error) {
            return res.status(validation.error.code).json(validation.error.message);
        }
        const posts = await postService.getAll();
        res.status(200).json(posts);
    }, 

    getById: async (req, res) => {
        const token = req.headers.authorization;
        const validation = jwtService.validateToken(token);
        if (validation.error) {
          return res.status(validation.error.code).json(validation.error.message);
        }
        const { id } = req.params;
        const post = await postService.getById(id);
        // if (!post) return res.status(404).json({ message: 'post does not exist' });
        res.status(200).json(post);
      },
};

module.exports = postController;