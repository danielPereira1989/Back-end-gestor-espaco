const jsonMessages = require('../assets/jsonMessages/bd');
const saltRounds = 10;
const connect = require('../config/connectMySQL');
var bcrypt = require('bcryptjs');

function read(req, res) {
    //criar e executar a query de leitura na BD
    //const id_material = req.sanitize('id').escape();   //exportaras funções
   const query = connect.con.query('SELECT * from materials where active = 1',
        function (err, rows, fields) {

            console.log(query.sql);
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
    const id_material = req.sanitize('id').escape();
    const post = {
        id_material: id_material
    };
    const query = connect.con.query('SELECT * from materials where ?', post,
        function (err, rows, fields) {
            if (!err) {
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


        const nome_material = req.sanitize('nome_material').escape();
        const quantidade = req.sanitize('quantidade').escape();
        const descricao = req.sanitize('descricao').escape();
        const idEspaco_fk = req.sanitize('idEspaco_fk').escape();
        const referencia_material = req.sanitize('referencia_material').escape();

        const errors = req.validationErrors();

         if (errors) {
            res.send(errors);
            return;
        }
        else {
            if (nome_material != "NULL" && quantidade != 'NULL' &&
            descricao != "NULL" && idEspaco_fk != "NULL" && referencia_material != 'NULL' ) {

               const post = {

                nome_material : nome_material,
                quantidade : quantidade,
                descricao : descricao,
                idEspaco_fk : idEspaco_fk,
                referencia_material : referencia_material,


            };

            const query = connect.con.query('INSERT INTO materials SET ?', post, function (err, rows, fields) {
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
        }
    }

    function update(req, res) {
        const nome_material = req.sanitize('nome_material').escape();
        const quantidade = req.sanitize('quantidade').escape();
        const descricao = req.sanitize('descricao').escape();
        const idEspaco_fk = req.sanitize('idEspaco_fk').escape();
        const referencia_material = req.sanitize('referencia_material').escape();
        const id_material = req.sanitize('id_material').escape();

        const errors = req.validationErrors();

     if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (nome_material != "NULL" && quantidade != "NULL" && descricao != 'NULL' && idEspaco_fk != 'NULL' && referencia_material != 'NULL') {
            const update = [nome_material, quantidade, descricao, idEspaco_fk, referencia_material, id_material];
            const query = connect.con.query('UPDATE materials SET nome_material =?, quantidade =?, descricao =?, idEspaco_fk =?, referencia_material =? WHERE id_material=?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    console.log("Number of records updated: " + rows.affectedRows);
                    res.status(200).send({ "msg": "update with success" });
                } else {
                    res.status(400).send({ "msg": err.code });
                    console.log('Error while performing Query.', err);
                }
            });
        }


    }
    }

    function deleteLogico(req, res) {
        const update = [0, req.sanitize('id_espaco').escape()];
        const query = connect.con.query('UPDATE materials SET active = ? WHERE id_material=?', update, function(err, rows, fields) {
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

module.exports = {
    read: read,
    readID: readID,
    save : save,
    deleteLogico: deleteLogico,
    update: update,

};
