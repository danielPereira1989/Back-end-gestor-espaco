const connect = require('../config/connectMySQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");


function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT id_patrocinador, nome_patrocinador, NIF, morada, Contacto, pessoa_contacto from sponser',
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
    const id_patrocinador = req.sanitize('id_pratocinador').escape();
    const post = {
        id_patrocinador: id_patrocinador
    };
    connect.con.query('SELECT  nome_patrocinador, NIF, Morada, Contacto, pessoa_contacto from sponser where id_patrocinador = ?', post,
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


function save1(req, res) {
    //receber os dados do formuário que são enviados por post
    //const id_patrocinador = req.sanitize('id_patrocinador').escape();
    const nome_patrocinador = req.sanitize('nome_patrocinador').escape();
    const NIF = req.sanitize('NIF').escape();
    const Morada = req.sanitize('Morada').escape();
    const Contacto = req.sanitize('Contacto').escape();
    const pessoa_contacto = req.sanitize('pessoa_contacto').escape();

    //fazer validações !!!!!!!!!!!!!!!!!  ver

    const errors = req.validationErrors();
    
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (nome_patrocinador != "NULL" && typeof(nome_patrocinador) != 'undefined' && NIF != "NULL" && 
        Morada != "NULL" && Contacto != "NULL" && pessoa_contacto != "NULL" ) {
            const post = { 
                nome_patrocinador: nome_patrocinador, 
                //aprovacao: aprovacao, 
                NIF: NIF,
                Morada: Morada,
                Contacto: Contacto,
                pessoa_contacto: pessoa_contacto,
                
            };
            //criar e executar a query de gravação na BD para inserir os dados presentes no post
            const query = connect.con.query('INSERT INTO sponser SET ?', post, function(err, rows, fields) {
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

//funcao save patrocinio
function save(req, res) {

    //receber os dados do formuário de registo de patrocinador e patrocinio que são enviados por post

    //const id_patrocinador = req.sanitize('id_patrocinador').escape();
    const nome_patrocinador = req.sanitize('nome_patrocinador').escape();
    const NIF = req.sanitize('NIF').escape();
    //const Morada = req.sanitize('Morada').escape();
    const Contacto = req.sanitize('Contacto').escape();
    //const pessoa_contacto = req.sanitize('pessoa_contacto').escape();
    const preco_patrocinio = req.sanitize('preco_patrocinio');
    const tipo_patrocinio = req.sanitize('tipo_patrocinio');
    const txtNotas = req.sanitize('txtNotas');

    
    req.checkBody("nome_patrocinador", "nsira apenas texto").matches(/^[a-z ]+$/i)
    req.checkBody("NIF", "Insira um NIF válido").isNumeric();
    //req.checkBody("Morada", "Insira apenas texto").matches(/^[a-z ]+$/i);
    req.checkBody("Contacto", "Insira um contacto válido").isNumeric();
    //req.checkBody("pessoa_contacto", "Insira um cotacto valido, do representante do patrocinador").isNumeric();
    req.checkBody("preco_patrocinio", "Insira um montante válido").isNumeric();
    req.checkBody("tipo_patrocinio", "Insira um tipo de patrocinio válido").matches(/^[a-z ]+$/i);
    req.checkBody("txtNotas", "Insira apenas texto").matches(/^[a-z ]+$/i);


    const errors = req.validationErrors();

    if(errors){
        res.send(errors);
        return;
    }
    else{
        if(nome_patrocinador != null && NIF != null&& preco_patrocinio != null && txtNotas != null){
                
                const postSponser = {
                    nome_patrocinador: nome_patrocinador, 
                    //aprovacao: aprovacao, 
                    NIF: NIF,
                    //Morada: Morada,
                    Contacto: Contacto,
                    //pessoa_contacto: pessoa_contacto,
                };

                const postSponsership = {
                    preco_patrocinio : preco_patrocinio,
                    tipo_patrocinio : tipo_patrocinio,
                    txtNotas : txtNotas,

                }

                let queryGuardarSponser = '';
                let queryGuardarSponsership = '';

                queryGuardarSponser = connect.con.query('INSERT INTO sponser SET ?', postSponser, function(err, rows, fields){
                    res.status(jsonMessages.bd.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                    console.log(queryGuardarSponser.sql);
                    const id = rows.insertId;

                    const objetoID = {
                        id : id,
                        preco_patrocinio : preco_patrocinio,
                        tipo_patrocinio : tipo_patrocinio,
                        txtNotas : txtNotas,
                    }

                    if(!err){
                        queryGuardarSponsership = connect.con.query('INSERT INTO space_sponsership SET ?', objetoID, function(err, rows, fields){
                            console.log(queryGuardarSponsership.sql);

                            if(!err){
                                res.status(jsonMessages.bd.successInsert.status).location(rows.insertId).send(jsonMessages.db.successInsert);
                                console.log('Patrocinio registado com sucesso!');
                            }
                        });
                    }
                    else{
                        console.log(err);
                        res.status(jsonMessages.db.dbError.status).send(jsonMessages.db.dbError);
                    }
                });
            }
            else{
                res.status(jsonMessages.db.requiredData.status).send(jsonMessages.db.requiredData);
            }
    }
}



function update(req, res) {
    //receber os dados do formuário que são enviados por post
    const id_patrocinador = req.sanitize('id_patrocinador').escape();
    const nome_patrocinador = req.sanitize('nome_patrocinador').escape();
    const NIF = req.sanitize('NIF').escape();
    const Morada = req.sanitize('Morada').escape();
    const Contacto = req.sanitize('Contacto').escape();
    const pessoa_contacto = req.sanitize('pessoa_contacto').escape();
    console.log("without hahsh:" + req.body.pass);
    
    const query = "";
    
        var update = {
            id_patrocinador,
            nome_patrocinador,
            NIF,
            Morada,
            Contacto,
            pessoa_contacto,
        };
        query = connect.con.query('INSERT INTO sponsers SET nome_patrocinador = ?, NIF =?, Morada=?, Contacto=?, pessoa_contacto=? where id_patrocinador=?', update, function (err, rows,
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
    }

function deleteF(req, res) {
    //criar e executar a query de leitura na BD
    const id_patrocinador = req.sanitize('id_patrocinador').escape();
    const update = {
        id_patrocinador: id_patrocinador
    };
    connect.con.query('DELETE from sponser where id_patrocinador = ?', update, function (err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            } else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        } else
            console.log('Error while performing Query.', err);
    });
}

module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteF: deleteF,
};