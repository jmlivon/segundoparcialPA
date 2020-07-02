var express = require('express');
var router = express.Router();

const { sign, verify } = require('../modules/jwt');
var rtaAPIOk = {code: 200, data: 'Ok'};

function validarToken(req, res, next){
  const token = req.get('token');
  const payload = verify(token);
  if(!payload){
    return res.json({code: 999, data: 'Sin Permisos!'});
  }

  req.user = payload;

  next();
}

router.post('/', (req, res) => {

  const db = req.db;

  var user = {
    email : req.query.email,
    nombre : req.query.nombre,
    clave : req.query.clave,
    tipo : req.query.tipo,
    legajo : req.query.legajo
  }

  db.collection("usuarios").insertOne(user, function(err, res) {
    if(err){
      res.json({rta: 'error!'});
      return;
    }
    console.log("1 usuario agregado");
  });

  res.json(rtaAPIOk);

});

router.post('/login', (req, res) => {

  const token = sign({
    email : req.query.email,
    clave : req.query.clave,
  })

  res.json(token);
  //res.json(rtaAPIOk);
  
});

// A partir de acá requerimos autenticación
router.use(validarToken);

router.post('/materias',(req, res) =>{

  const user = req.user;
  const db = req.db;

  var materia = {
    idMateria : "1",
    materia : req.query.materia,
    cuatrimestre : req.query.cuatrimestre,
    vacantes : req.query.vacantes,
    profesor : req.query.profesor
  }

  db.collection("materias").insertOne(materia, function(err, res) {
    if(err){
      res.json({rta: 'error!'});
      return;
    }
    console.log("1 materia agregada");
  });

  res.json(rtaAPIOk);
  //res.json({rta: 'Materias', user});
});

router.get('/materias/:id', (req, res) => {

  const idMateria = req.params.id;

  const db = req.db;
  const materias = db.collection('materias');

  materias.find({idMateria: idMateria}, {}).toArray((err, data) => {
    if(err){
      res.json({rta: 'error!'});
      return;
    }

    res.json(data);
  });

});




















/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
