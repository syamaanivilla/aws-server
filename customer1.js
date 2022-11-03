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

app.get("/goodrating", function (req, res) {
  console.log(req.body);

  const params = {
    TableName: "customersurvey",
    FilterExpression:
      "contains(#product_serv_like, :product_serv_like) AND #product_serv_dislike =:product_serv_dislike",
    ExpressionAttributeNames: {
      "#product_serv_like": "product_serv_like",
      "#product_serv_dislike": "product_serv_dislike",
    },
    ExpressionAttributeValues: {
      ":product_serv_like": { S: "satisfiled" },
      ":product_serv_dislike": { S: "nothing" },
    },
  };
  //   DynamoDB.scan(params, function (err, data) {
  //     if (err) {
  //       console.error("Unable to find movies", err);
  //     } else {
  //       console.log(`Found ${data.Count} movies`);
  //       console.log(data);
  //       res.json(data);
  //     }
  //   });
  // });
  DynamoDB.scan(params, function (err, data) {
    if (err) console.log(err);
    else console.log(data.Items);
    return res.json(data.Items);
  });
});
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
