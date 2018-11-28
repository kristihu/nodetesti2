'use strict';
// get the client
const mysql = require('mysql2');

const connect = () => {

// create the connection to database

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  //Tarkastetaan saadaanko MySql yhteys
  connection.connect(function(error){
    if(!!error){
      console.log("Error to connect mySQL");
    }else{
      console.log("Connected to MySQL");
    }
  });
  return connection;
};



const select = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM wp_users;',
      (err, results, fields) => {
       // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const insert = (data, connection, callback) => {
  console.log("uppaus2?");
  // simple query
  connection.execute(
      'INSERT INTO wp_users (ufname, ulname, ufile, uthumb, mimetype, coordinates) VALUES (?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertA = (data, connection, callback) => {
  console.log("uppaus2?");
  // simple query
  connection.execute(
      'INSERT INTO wp_users (ufname, ulname, ufile, uthumb, mimetype, coordinates) VALUES (?, ?, ?, ?, ?, ?);',
      data,
      (err, results, fields) => {
       // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const haeTykkays = (data, connection, callback) => {
  // simple query
  const sqlS = 'SELECT * FROM tykkaykset WHERE kuva_id = "'+data+'";'
  console.log(sqlS);
  connection.query(
      'SELECT * FROM tykkaykset WHERE kuva_id = "'+data+'";',
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};


const tykkaa = (connection, callback) => {
  // simple query
  connection.execute(
      'UPDATE tykkaykset SET tykkays = tykkays + 1 WHERE kuva_id = 2',
      (err, results, fields) => {
        console.log("Er?");
        console.log(err);
        callback();
      },
  );
};


module.exports = {
  connect: connect,
  select: select,
  insert: insert,
  insertA: insertA,
  haeTykkays: haeTykkays,
  tykkaa: tykkaa,
};