const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

const connect = require('../config/connectMySQL'); //função de leitura que retorna o resultado no callback

function read(req, res) {
    //criar e executar a query de leitura na BD
    const query = connect.con.query('SELECT * FROM spacemanager order by id_gestor_espaco', function(err, rows, fields) {
        console.log(query.sql); //falta aprovaco......!!!!!!!
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

function readID(req, res) {
    //criar e executar a query de leitura na BD para um ID específico
    const id_gestor_espaco = req.sanitize('id_gestor_espaco').escape();
    const post = { id_gestor_espaco: id_gestor_espaco };
    const query = connect.con.query('SELECT * = ? order by id_gestor_espaco ', post, function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.db.noRecords.status).send(jsonMessages.db.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

function save(req, res) {
    console.log("fgjhj");
    console.log("2ghgh")
    //receber os dados do formuário que são enviados por post
    const nome_gestor_espaco = req.sanitize('nome_gestor_espaco').escape();
    //const aprovacao = req.sanitize('aprovacao').escape();
    //const username = req.sanitize('username').escape();
    //const email = req.sanitize('email').escape();
    const morada = req.sanitize('morada').escape();
    const nif = req.sanitize('nif').escape();
    const data_nascimento = req.sanitize('data_nascimento').escape();
    const telefone = req.sanitize('telefone').escape();
    const idEspacoSP_fk = req.sanitize('idEspacoSP_fk').escape();
    const users_fk = req.sanitize('users_fk').escape();

    const errors = req.validationErrors();
    
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (nome_gestor_espaco != "NULL" && typeof(nome_gestor_espaco) != 'undefined' /*&& username != "NULL" && 
        email != "NULL" */&& morada != "NULL" && nif != "NULL" && data_nascimento != "NULL" && telefone != "NULL" && users_fk != "NULL") {
            const post = { 
                nome_gestor_espaco: nome_gestor_espaco, 
                //aprovacao: aprovacao, 
                //username: username,
                //email: email,
                morada: morada,
                nif: nif,
                data_nascimento: data_nascimento,
                telefone: telefone,
                idEspacoSP_fk : idEspacoSP_fk,
                users_fk : users_fk,
            };
            //criar e executar a query de gravação na BD para inserir os dados presentes no post
            const query = connect.con.query('INSERT INTO space_manager SET ?', post, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}

/*//criar e executar a query de update  na BD
function update(req, res) {
    const id_gestor_espaco = req.sanitize('id_gestor_gespaco').escape();
    const nome_gestor_espaco = req.sanitize('nome_gestor_espaco').escape();
    const aprovacao = req.sanitize('aprovacao').escape();
    //const user_username = req.sanitize('user_username').escape();
    //const email = req.sanitize('email').escape();
    const morada = req.sanitize('morada').escape();
    const nif = req.sanitize('nif').escape();
    const data_nascimento = req.sanitize('data_nascimento').escape();
    const telefone = req.sanitize('telefone').escape();
    
    

    req.checkBody("nome", "Insira apenas texto").matches(/^[a-z ]+$/i);
    req.checkBody("categoria", "Insira apenas texto").optional({ checkFalsy: true }).matches(/^[a-z ]+$/i);
    req.checkBody("logo", "Insira um url válido.").optional({ checkFalsy: true }).isURL();
    

    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (id_gestor_espaco != "NULL" && typeof(nome_gestor_espaco) != 'undefined' && typeof(id_gestor_espaco) != 'undefined') {
            const update = [nome_gestor_espaco, aprovacao, user_username, email, morada, nif, data_nascimento, telefone, id_gestor_espaco];
            const query = connect.con.query('UPDATE space_manager SET nome_espaco =?, aprovacao =?, user_username=?, email=?, morada=?, nif=?, data_nascimento=?, telefone=? WHERE id_gestor_espaco = ?', update, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.db.successUpdate.status).send(jsonMessages.db.successUpdate);
                }
                else {
                    console.log(err);
                    res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                }
            });
        }
        else
            res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
    }
}
//delete lógico
/*
function deleteL(req, res) {
    const update = [0, req.sanitize('id_gestor_espaco').escape()];
    const query = connect.con.query('UPDATE space_manager SET active = 1 WHERE id_gestor_espaco = ?', update, function(err, rows, fields) {
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


delete físico
function deleteF(req, res) {
    const update = req.sanitize('id_gestor_espaco').escape();
    const query = connect.con.query('DELETE FROM space_manager WHERE id_gestor_espaco=?', update, function(err, rows, fields) {
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
function readAll(req, res) {
    
    connect.con.query('SELECT * FROM  space_manager a, space b, users c WHERE a.idEspacoSM_fk = b.id_espaco AND a.users_fk = c.id;',

    function (err, rows, fields) {
        if (!err) {
            
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            } else {
                res.status(200).send(rows);
            }
        } else console.log('Error while performing Query.', err);
    });
}




module.exports = {
    read: read,
    readID: readID,
    save: save,
    //update: update,
    //deleteL: deleteL,
    //deleteF: deleteF,
    readAll : readAll,
}