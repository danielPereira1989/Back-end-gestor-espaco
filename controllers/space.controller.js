//definiçaoconstantes
const saltRounds = 10;
const connect = require('../config/connectMySQL');
var bcrypt = require('bcryptjs');

function read(req, res) {
    //criar e executar a query de leitura na BD
    // const iduser = req.sanitize('id').escape();//colocaras quatrofunções(...)//exportaras funções
    connect.con.query('SELECT * from space',
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
    //criar e executar a query de leitura na BD
    const id_espaco = req.sanitize('id').escape();
    const post = {
        id_espaco: id_espaco
    };
    connect.con.query('SELECT * from space where id_espaco = ?', post,
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
    const id_espaco = req.sanitize('id_espaco').escape();

    const localidade = req.sanitize('localidade').escape();
    const morada = req.sanitize('morada').escape();
    const coordenadas_gps = req.sanitize('coordenadas_gps').escape();
    const receita_monetaria_espaco = req.sanitize('receita_monetaria_espaco').escape();



    const query = "";
        const post = {
            id_espaco : id_espaco,

            localidade : localidade,
            morada : morada,
            coordenadas_gps : coordenadas_gps,
            receita_monetaria_espaco : receita_monetaria_espaco,

        };
        console.log("with hash:" + hash);
        query = connect.con.query('INSERT INTO space SET ?', post, function (err, rows, fields) {
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

/*
function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const id_espaco = req.sanitize('id_espaco').escape();

    const localidade = req.sanitize('localidade').escape();
    const morada = req.sanitize('morada').escape();
    const coordenadas_gps = req.sanitize('coordenadas_gps').escape();
    const receita_monetaria_espaco = req.sanitize('receita_monetaria_espaco').escape();
    //console.log("without hahsh:" + req.body.pass);

        var update = {

            localidade,
            morada,
            coordenadas_gps,
            receita_monetaria_espaco,
            hash,
            id_espaco
        };
        const query = connect.con.query('INSERT INTO space SET id_gestor_espaco = ?, localidade =?, morada=?, coordenadas_gps=?, receita_monetaria_espaco=? where id_espaco=?', update, function (err, rows,
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
    };


    function deleteID(req, res) {
        const update = req.sanitize('id').escape();
        const query = connect.con.query('DELETE FROM sponsor WHERE id_espaco = ?', update, function(err, rows, fields) {
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


*/





module.exports = {
    read: read,
    readID: readID,
    save: save,
    //update: update,
    //deleteID: deleteID,

};
