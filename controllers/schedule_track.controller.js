const saltRounds = 10;
const connect = require('../config/connectMySQL');
var bcrypt = require('bcrypt');

function read(req, res) {
    
    connect.con.query('SELECT * from schedule_track',
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
  
    const idschedule_track = req.sanitize('id').escape();
    const post = {
        idschedule_track: idschedule_track
    };
    connect.con.query('SELECT date, initial_time, final_time from schedule_track order by distance where idtrack = ? order by distance desc', post,
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
    

    const date = req.sanitize('date').escape();
    const initial_time = req.sanitize('initial_time').escape();
    const final_time = req.sanitize('final_time').escape();
    
    const errors = req.validationErrors();
	 
	 if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (date!= "NULL" && initial_time != "NULL" && final_time != 'NULL') {
          
		   const post = {
            
           date : date,
           initial_time : initial_time,
           final_time : final_time,
            
        };
        
        const query = connect.con.query('INSERT INTO schedule_track SET ?', post, function (err, rows, fields) {
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