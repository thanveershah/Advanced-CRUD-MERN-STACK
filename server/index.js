const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const mysql = require("mysql");
const app = express();
// const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "../public/images/" });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());

const conn = mysql.createConnection({
  hostL: "localhost",
  user: "root",
  password: "",
  database: "express"
});

conn.connect(err => {
  if (err) throw err;
  console.log("connected");
});


// app.post("/user",upload.single("avatar"),(req,res)=>{
//   var username = req.body.username;
//   var email = req.body.email;
//   if (username && email) {
//       const tempPath = req.file.path;
//       const targetPath = path.join(__dirname, "../public/images/" + req.file.filename + req.file.originalname);
//       fs.rename(tempPath, targetPath, err => {
//         if (err) return handleError(err, res);
//         res.status(200).contentType("multipart/form-data").end("File uploaded!");
//       });
//     const sqlInsert = "INSERT INTO expresstable (username,email,image) VALUES ('" + username + "','" + email + "','" + targetPath + "')";
//     conn.query(sqlInsert, (err, data) => {
//       if (err) throw err;
//       console.log(data.length);
//       if (!data.length) {
//         conn.query(sqlInsert, (err, data1) => {
//           if (err) throw err;
//           res.send(JSON.stringify(data1));
//         });
//       }
//     })
//   }
// })



app.post("/user", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;

  if (username && email) {
    const sqlSelect = "SELECT * FROM expresstable WHERE username='" + username +"' AND email='" + email +"'";
    const sqlInsert = "INSERT INTO expresstable (username,email) VALUES ('" + username +"','" + email + "')";
  
    conn.query(sqlSelect, (err, data) => {
      if (err) throw err;
      console.log(data.length);
      if (!data.length) { 
        conn.query(sqlInsert, (err, data1) => {
          if (err) throw err;
          res.send(JSON.stringify(data1));
        });
      }
    });
  }
});

app.delete("/user/:id", (req, res) => {
  var id = req.params.id;
  const sql = "DELETE FROM expresstable WHERE id='" + id + "'";
  conn.query(sql, (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(data));
  });
});

app.delete("/user", (req, res) => {
  var id = req.params.id;
  const sql = "DELETE FROM expresstable";
  conn.query(sql, (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(data));
  });
});

app.put("/user/:id", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  var id = req.params.id;
  const sql = "UPDATE expresstable SET username='" +username + "' , email='" +email +"' WHERE id='" +id +"' ";
  conn.query(sql, (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(data));
  });
});

app.get("/user/:key", (req, res) => {
  let key = req.params.key;
  const sql = "SELECT username,email FROM expresstable  WHERE username LIKE  '%" +key + "%'  ";
  console.log(sql);
  conn.query(sql, (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(data));
  });
});

app.get("/user/:test/:type", (req, res) => {
  let test = req.params.test;
  let type = req.params.type;
  if (type === "details") {
    const sql ="SELECT id,username,email FROM expresstable WHERE id='" + test +  "' ";
    console.log(sql);
    conn.query(sql, (err, data) => {
      if (err) throw err;
      res.send(JSON.stringify(data));
    });
  }
});



app.get("/user", (req, res) => {
  var startVal = parseInt(req.query.startVal);
  console.log(startVal);
  const sql = "SELECT * FROM expresstable LIMIT ?,3";
  conn.query(sql, startVal, (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(data));
  });
});


app.get("/pagination", (req, res) => {
  const query = "SELECT COUNT(*) AS Totalcount FROM expresstable";
  conn.query(query, (err, data1) => {
    if (err) throw err;
    var totalPage = Math.ceil(data1[0].Totalcount / 3);
    console.log(totalPage); 
    res.send(JSON.stringify(totalPage));
  });
});





// app.get("/user", (req, res) => {
//   var limit = 3;
//   const sql = "SELECT * FROM expresstable LIMIT 0,?";
//   conn.query(sql, limit, (err, data) => {
//     if (err) throw err;
//     res.send(JSON.stringify(data));
//   });
// });








// app.get("/user", (req, res) => {
//   var showmore = req.body.showmore;
//   var index = index + req.params.index;
//   if (showmore) {
//     const sql = "SELECT * FROM expresstable LIMIT  10 ";
//     conn.query(sql, (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       res.send(JSON.stringify(data));
//     });
//   }
// });


app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
