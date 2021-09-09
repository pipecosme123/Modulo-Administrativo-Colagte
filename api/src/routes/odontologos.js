const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();
const mysqlConnection = require('../database');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM ejemploOdontologos', (err, row, fields) => {
        if (!err) {
            res.json(row);
            console.log(res)
        } else {
            console.log(err);
        }
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    
    mysqlConnection.query('SELECT * FROM ejemploOdontologos WHERE id = ?', [id], (err, row, fields) => {
        if (!err) {
            res.json(row[0]);
        } else {
            console.log(err);
        }
    })
})

router.post('/', (req, res) => {
    const {
        id,
        cedulas,
        codigosColgate,
        nombres,
        apellidos,
        ciudades
    } = req.body;
    console.log(req.body);
    const query = `
        CALL dentistAddOrEdit( ?, ?, ?, ?, ?, ?);
    `;
    mysqlConnection.query(query, [id, cedulas, codigosColgate, nombres, apellidos, ciudades], (err, row, fields) => {
        if (!err) {
            res.json({
                Status: "Odontologo Insertado"
            });
        } else {
            console.log(err);
        }
    })
})

router.put('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        cedulas,
        codigosColgate,
        nombres,
        apellidos,
        ciudades
    } = req.body;

    console.log(req.body);
    const query = "CALL dentistAddOrEdit( ?, ?, ?, ?, ?, ?);";
    mysqlConnection.query(query, [id, cedulas, codigosColgate, nombres, apellidos, ciudades], (err, row, fields) => {
        if (!err) {
            res.json({
                Status: "Odontologo Actualizado"
            });
        } else {
            console.log(err);
        }
    })
})

router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    mysqlConnection.query('DELETE FROM ejemploOdontologos WHERE id = ?', [id], (err, row, fields) => {
        if (!err) {
            res.json({
                Status: "Odontologo Eliminado"
            });
        } else {
            console.log(err);
        }
    })
})

router.get('/api', (req, res) => {
    res.send('testing API');
});


module.exports = router;