var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer"); //Step 1S
var path = require("path");
const AWS = require("aws-sdk");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Origin", "*");
  return next();
});

app.use(express.static(__dirname)); //Step 2

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

app.post("/addpersons", function (req, res) {
  console.log(req.body);
  const params = {
    TableName: "persons",
    Item: {
      personid: { N: req.body.personid },
      lastname: { S: req.body.lastname },
      firstname: { S: req.body.firstname },
      address: { S: req.body.address },
      city: { S: req.body.city },
    },
  };
  DynamoDB.putItem(params, function (err, data) {
    if (err) {
      console.error("Unable to add person", err);
    } else {
      console.log(`Added with details`, data.Item);
      res.json(data.Item);
    }
  });
});
///get all
app.get("/getallpersons", function (req, res) {
  console.log(req.body);
  const params = {
    TableName: "persons",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find movies", err);
    } else {
      console.log(`Found ${data.Count} movies`);
      console.log(data.Items);
      res.json(data.Items);
    }
  });
});
//get one

app.get("/getperson", function (req, res) {
  console.log(req.body);
  const params = {
    TableName: "persons",
    Key: {
      personid: { N: req.body.personid },
    },
  };
  DynamoDB.getItem(params, function (err, data) {
    if (err) {
      console.error("Unable to find person", err);
    } else {
      console.log("Found person", data.Item);
      res.json(data.Item);
    }
  });
});
////update
app.post("/updateperson", function (req, res) {
  console.log(req.body);
  const params = {
    TableName: "persons",
    Item: {
      personid: { N: req.body.personid },
      lastname: { S: req.body.lastname.toString() },
      firstname: { S: req.body.firstname },
      address: { S: req.body.address },
      city: { S: req.body.city },
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to find person", err);
    } else {
      console.log(`updated`);
    }
  });
});
///////delete
app.post("/deleteperson", function (req, res) {
  console.log(req.body);
  const params = {
    TableName: "persons",
    Key: {
      personid: { N: req.body.personid },
    },
  };

  DynamoDB.deleteItem(params, function (err) {
    if (err) {
      console.error("Unable to find person", err);
    } else {
      console.log(`Deleted`);
    }
  });
});
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
