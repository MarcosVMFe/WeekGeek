var express = require("express");
var router = express.Router();

var exigirLogin = require("../middlewares/exigirLogin");
var rankingController = require("../controllers/rankingController");

router.get("/", exigirLogin, function (req, res) { rankingController.listar(req, res); });
router.post("/adicionar", exigirLogin, function (req, res) { rankingController.adicionar(req, res); });
router.post("/remover", exigirLogin, function (req, res) { rankingController.remover(req, res); });
router.post("/ordem", exigirLogin, function (req, res) { rankingController.ordem(req, res); });

module.exports = router;