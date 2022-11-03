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

app.post("/addproducts", function (req, res) {
  console.log(req.body);
  const params = {
    TableName: "customersurvey",
    Item: {
      cus_id: { N: req.body.cus_id },
      cus_mobile: { N: req.body.cus_mobile },
      delivery_product: { N: req.body.delivery_product },
      response_sales: { N: req.body.response_sales },
      quality_prod: { N: req.body.quality_prod },
      gasketing_prod: { N: req.body.gasketing_prod },
      cus_com: { N: req.body.cus_com },
      inside_salesrep: { N: req.body.inside_salesrep },
      outside_salesrep: { N: req.body.outside_salesrep },
      counter_salesrep: { N: req.body.counter_salesrep },
      product_serv_like: { S: req.body.product_serv_like },
      product_serv_dislike: { S: req.body.product_serv_dislike },
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
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
