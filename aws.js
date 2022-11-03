const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var multer = require("multer"); //Step 1
var path = require("path");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  return next();
});

app.use(express.static(__dirname)); //Step 2

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

var con = {
  host: "proclinkdb1.clpyab4r3ror.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "syamalamba",
  database: "mydb1",
};

var connection;
function handleDisconnect() {
  connection = mysql.createConnection(con);
  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
      console.log("i got it");
    } // to avoid a hot loop, and to allow our node script to
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

//Step 3: Configure multer
var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    //Default folder config
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    //Attach timestamp beside file name
    var datetimestamp = Date.now();
    cb(
      null,
      file.originalname.replace(path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

function addEmployee(nickname, salary) {
    app.post("/newbook", function (req, res) {
        console.log(req.body);
        var sqlList =
          "Insert into books(bookname,author,price) values(" +
          "'" +
          req.body.bookname +
          "','" +
          req.body.author +
          "'," +
          req.body.price +
          ")";
        console.log(sqlList);
        var query = connection.query(sqlList, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result.insertId);
            res.json(result);
          }
        });
      });

module.exports = {
  addEmployee,
};
