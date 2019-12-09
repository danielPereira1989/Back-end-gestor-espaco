/*
//definiçãode constantes
const saltRounds = 10;
const connect = require('../config/connectMySQL');
var bcrypt = require('bcrypt');

function read(req, res) {
    //criar e executar a query de leitura na BD
    const query = connect.con.query('SELECT idtrack, nametrack, distance from track order by distance desc',
        function (err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send("Data not found");
                } else {
                    res.status(200).send(rows);
                }
            } else console.log('Error while performing Query.', err);
        });
}

function readID(req, res) {
    let query = "";
    //criar e executar a query de leitura na BD
    const idtrack = req.sanitize('idtrack').escape();
    const post = { idtrack: idtrack };
    query = connect.con.query('SELECT idtrack, nametrack, distance from track where idtrack = ? order by distance desc', post,
        function (err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                } else {
                    res.status(200).send(rows);
                }
            } else
                res.status(400).send({
                    "msg": err.code
                });
        }
    );
}

function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const idtrack = req.sanitize('idtrack').escape();
    const nametrack = req.sanitize('nametrack').escape();
    const distance = req.sanitize('distance').escape();
    
    let query = "";
        const post = {
            idtrack: idtrack,
            nametrack: nametrack,
            distance: distance
        };
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO track SET ?', post, function (err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(200).location(rows.insertId).send({
                    "msg": "inserted with success"
                });
                console.log("Number of records inserted: " + rows.affectedRows);
            } else {
                if (err.code == "ER_DUP_ENTRY") {
                    res.status(409).send({ "msg": err.code });
                    console.log('Error while performing Query.', err);
                } else res.status(400).send({ "msg": err.code });
            }
        });
    };


function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const idtrack = req.sanitize('idtrack').escape();
    const nametrack = req.sanitize('nametrack').escape();
    const distance = req.sanitize('distance').escape();
    console.log("without hahsh:" + req.body.pass);
    var query = "";
    bcrypt.hash(password, saltRounds).then(function (hash) {
        console.log("with hash:" + hash);
        var update = {
            idtrack,
            nametrack,
            distance
        };
        const query = connect.con.query('INSERT INTO track SET nametrack = ?, distance =? where idtrack=?', update, function (err, rows,
            fields) {

            console.log(query.sql);
            if (!err) {
                console.log("Number of records updated: " + rows.affectedRows);
                res.status(200).send({ "msg": "update with success" });
            } else {
                res.status(400).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
        });
    });
}

//delete lógico
function deleteL(req, res) {
    const update = [0, req.sanitize('idtrack').escape()];
    const query = connect.con.query('UPDATE track SET active = ? WHERE idtrack =?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDelete.status).send(jsonMessages.db.successDelete);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}

//delete físico
function deleteF(req, res) {
    const update = req.sanitize('idtrack').escape();
    const query = connect.con.query('DELETE FROM track WHERE idtrack=?', update, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(jsonMessages.db.successDeleteU.status).send(jsonMessages.db.successDeleteU);
        }
        else {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
    });
}
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteL: deleteL,
    deleteF: deleteF
};
*/