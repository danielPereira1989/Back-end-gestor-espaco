const saltRounds = 10;
const connect = require('../config/connectMySQL');
var bcrypt = require('bcryptjs');

function read(req, res) {

    connect.con.query('SELECT * from track',
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

function readID(req, res) {

    const idTrack = req.sanitize('id').escape();
    const post = {
        idTrack: idTrack
    };
    connect.con.query('SELECT * from track where idTrack = ? order by distance desc', post,
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


    const track_name = req.sanitize('track_name').escape();
    const distance = req.sanitize('distance').escape();
    const idTracktype_fk = req.sanitize('idTracktype_fk').escape();
	const idScheduleTrack_fk = req.sanitize('idScheduleTrack_fk').escape();
    const idActivity_fk = req.sanitize('idActivity_fk').escape();
    const idEspacoT_fk = req.sanitize('idEspacoT_fk').escape();


	 const errors = req.validationErrors();

	 if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (track_name != "NULL" && distance != "NULL" && idTracktype_fk != 'NULL' && idScheduleTrack_fk != "NULL" &&
        idActivity_fk != "NULL" && idEspacoT_fk != "NULL") {

		   const post = {

            track_name : track_name,
            distance : distance,
            idTracktype_fk : idTracktype_fk,
            idScheduleTrack_fk : idScheduleTrack_fk,
            idActivity_fk : idActivity_fk,
            idEspacoT_fk : idEspacoT_fk,
        };

        const query = connect.con.query('INSERT INTO track SET ?', post, function (err, rows, fields) {
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

function readAll(req, res) {

    connect.con.query('SELECT * FROM track a, type_track b, schedule_track c, activity d, space e WHERE a.idTracktype_fk = b.idtype_track AND a.idScheduleTrack_fk = c.idschedule_track AND a.idActivity_fk = d.id_Atividade AND a.idEspacoT_fk = e.id_espaco',

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

/*function update(req, res) {
    //receber os dados do formuário que são enviados por post
    //const id_espaco = req.sanitize('id_espaco').escape();
    const nametrack = req.sanitize('nametrack').escape();
    const id_tipo_pista = req.sanitize('id_tipo_pista').escape();
    const espacos_id_espaco = req.sanitize('id').escape();
    const espacos_gestor_espaco_id_gestor_espaco = req.sanitize('espacos_gestor_espaco_id_gestor_espaco').escape();
    const track_type_id_tipo_pista = req.sanitize('track_type_id_tipo_pista').escape();
	const track_type_id_tipo_pista1 = req.sanitize('track_type_id_tipo_pista1').escape();
	const distance = req.sanitize('distance').escape();
	const id_horario_pista = req.sanitize('id_horario_pista').escape();

        var update = {
            id_espaco,
			nametrack,
			id_tipo_pista,
			espacos_id_espaco,
			espacos_gestor_espaco_id_gestor_espaco,
			track_type_id_tipo_pista,
			track_type_id_tipo_pista1,
			distance,
			id_horario_pista,
        };
        query = connect.con.query('INSERT INTO track SET id_espaco, nametrack, id_tipo_pista, espacos_id_espaco, espacos_gestor_espaco_id_gestor_espaco, track_type_id_tipo_pista, track_type_id_tipo_pista1, distance, id_horario_pista', update, function (err, rows,
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


function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const iduser = req.sanitize('id').escape();
    const post = {
        idUser: iduser
    };
    connect.con.query('DELETE from users where idtrack = ?', post, function (err, rows, fields) {
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
*/
module.exports = {
    read: read,
    readID: readID,
    save: save,
    readAll : readAll,
    //update: update,
    //deleteID: deleteID
};
