// por como esta el router si se actualiza la pagina nos devuelve al inicio, lo que se puede hacer es delegar todas las rutas no encontradas
//al front y de esa manera ya manejar el routing con react routes
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
