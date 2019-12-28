const connect = require('../config/connectMySQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require('../assets/jsonMessages/bd');

function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from sponser where active = 1',
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
    const id_patrocinador = req.sanitize('id').escape();
    const post = {
        id_patrocinador: id_patrocinador
    };
    connect.con.query('SELECT * from sponser where ?', post,
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
    
    
    const nome_patrocinador = req.sanitize('nome_patrocinador').escape();
    const NIF = req.sanitize('NIF').escape();
    const Morada = req.sanitize('Morada').escape(); 
    const Contacto = req.sanitize('Contacto').escape();
    const pessoa_contacto = req.sanitize('pessoa_contacto').escape();
    const active = req.sanitize('active').escape();        
    const errors = req.validationErrors();
     
     if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (nome_patrocinador != "NULL" && NIF != "NULL" && Morada != 'NULL' && 
        Contacto != "NULL" && pessoa_contacto != "NULL" && active != 0) {
          
           const post = {
            
            nome_patrocinador : nome_patrocinador,
            NIF : NIF,
            Morada : Morada,                
            Contacto : Contacto,
            pessoa_contacto : pessoa_contacto,
            active : active,

        };
        
        const query = connect.con.query('INSERT INTO sponser SET ?', post, function (err, rows, fields) {
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
    const query = connect.con.query('UPDATE sponser SET active = ? WHERE id_patrocinador=?', update, function(err, rows, fields) {
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