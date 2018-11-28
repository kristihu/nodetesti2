'use strict';
require('dotenv').config();
const express = require('express');
// const fs      = require('fs');
// const https   = require('https');

const database = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');

const multer = require('multer');
const upload = multer({dest: 'public/files/'});

const app = express();

/*
const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
  key: sslkey,
  cert: sslcert
};
*/

app.use(express.static('public'));

// create the connection to database
const connection = database.connect();
//testataan toimiiko tietokanta
database.select(connection, (results) => {
  console.log("Asd");
});

const insertToDB = (data, res, next) => {
  database.insert(data, connection, () => {
    next();
  });
};

const haeTykkays = (data, req, next) => {
  database.haeTykkays(data, connection, (results) => {
    req.custom = results;
    next();
  });
};

const tykkaa = (res, next) => {
  database.tykkaa(connection, () => {
    next();
  });
};

const selectAll = (req, next) => {
  database.select(connection, (results) => {
    req.custom = results;
    next();
  });
};


const selectAll2 = (req, next) => {
  database.insertA(connection, (results) => {
    req.custom = results;
    next();
  });
};



//hae päivitetyt tiedot tietokannasta
app.use('/pageLoad', (req, res, next) => {
  selectAll(req, next);
});
//lähetä tiedot selaimeen//
app.use('/pageLoad', (req, res) => {
 // console.log(req.custom); //kaikki kuvat
  res.send(req.custom);
});




app.use('/like', (req, res, next) => {
  const data = 2;
  haeTykkays(data, req, next);
});

app.use('/like', (req, res, next) => {
  const data = 2;
  tykkaa( req, next);
  console.log(req.custom);
  res.send(req.custom);
});

/**
//hae kuvasta koordinaatit
app.use('/upload', (req, res, next) =>{
  exif.getCoordinates(req.file.path).then((coordinates)=>{
    req.coordinates = coordinates;
    next();

  }).catch((error)=>{
    console.log(error);
    req.coordinates= {};
    next();
  });

});

//tee thumbnail
app.use('/upload', (req, res, next)=> {

  resize.resizeImage(req.file.path, 150, './public/thumbs/'+req.file.filename+'_thumb').then(()=>{
    next();


  });

});*/
//tallenna tiedosto
app.post('/upload', upload.single('kuva'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  next();
});


// tallenna tiedot tietokantaan
app.use('/upload', (req, res, next) => {
  const data = ["asd", "asd", req.file.filename, null, null, null];
  insertToDB(data, res, next);
});
//hae päivitetyt tiedot tietokannasta
app.use('/upload', (req, res, next) => {
  selectAll(req, next);
});
//lähetä tiedot selaimeen//
app.use('/upload', (req, res) => {
  console.log(req.custom); //kaikki kuvat
  res.send(req.custom);
});




/*
app.get('/test', (req,res) => {
  if (req.secure) res.send('https :)');
  else res.send('hello not secure?');
});
*/

app.listen(8000); //normal http traffic
// https.createServer(options, app).listen(3000); //https traffic