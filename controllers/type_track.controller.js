const saltRounds = 10;
const connect = require('../config/connectMySQL');
var bcrypt = require('bcrypt');

function read(req, res) {
    
    connect.con.query('SELECT * from type_track',
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
  
    const idtype_track = req.sanitize('id').escape();
    const post = {
        idtype_track: idtype_track
    };
    connect.con.query('SELECT type from type_track order by distance where idtrack = ? order by distance desc', post,
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
    

    const type = req.sanitize('type').escape();
    
    
    const errors = req.validationErrors();
	 
	 if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (type!= "NULL") {
          
		   const post = {
            
           type : type,
           
           
            
        };
        
        const query = connect.con.query('INSERT INTO type_track SET ?', post, function (err, rows, fields) {
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
module.exports = {
    read: read,
    readID: readID,
    save: save,
    //update: update,
    //deleteID: deleteID
};