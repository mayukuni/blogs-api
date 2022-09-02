const authService = require('../services/authService');
// const jwtService = require('../services/jwtService');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }

        const token = await authService.login(email, password);
        if (!token) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        return res.status(200).json({ token });
    },
};
module.exports = authController;