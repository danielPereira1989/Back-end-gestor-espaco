const connect = require('../config/connectMySQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require('../assets/jsonMessages/bd');

function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from sponsership where active = 1',
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
    const id_sponsership = req.sanitize('id').escape();
    const post = {
        id_sponsership: id_sponsership
    };
    connect.con.query('SELECT * from sponsership where ?', post,
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
};

function save(req, res) {
    
    
    const preco_patrocinio = req.sanitize('preco_patrocinio').escape();
    const txtNotas = req.sanitize('txtNotas').escape();
    const validade_patrocinio = req.sanitize('validade_patrocinio').escape(); 
    const active = req.sanitize('active').escape();        
    const errors = req.validationErrors();
     
     if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (preco_patrocinio != "NULL" && txtNotas != "NULL" && validade_patrocinio!= 'NULL' && active != 0) {
          
           const post = {
            
           preco_patrocinio : preco_patrocinio,
           txtNotas : txtNotas,
           validade_patrocinio : validade_patrocinio,
           active : active,

        };
        
        const query = connect.con.query('INSERT INTO sponsership SET ?', post, function (err, rows, fields) {
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





function deleteLogico(req, res) {
    const update = [0, req.sanitize('id').escape()];
    const query = connect.con.query('UPDATE sponsership SET active = ? WHERE id_sponsership=?', update, function(err, rows, fields) {
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
    save: save,
    
    deleteLogico: deleteLogico,
};