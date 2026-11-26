var express = require("express");
var router = express.Router();

var exigirLogin = require("../middlewares/exigirLogin");
var dashboardController = require("../controllers/dashboardController");

router.get("/semana", exigirLogin, function (req, res) { dashboardController.semana(req, res); });

module.exports = router;
