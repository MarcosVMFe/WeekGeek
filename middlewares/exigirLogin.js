function exigirLogin(req, res, next) {
    if (!req.session || !req.session.usuarioId) {
        return res.status(401).json({ erro: "Você precisa entrar na sua conta." });
    }
    next();
}

module.exports = exigirLogin;