const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAT63RPD3AZTGNCIJW",
  secretAccessKey: "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",
});

var s3 = new AWS.S3();
var filePath = "./file.txt";

//configuring parameters
var params = {
  Bucket: "mysamplebuck97",
  Body: fs.createReadStream(filePath),
  Key: "myfiles/" + Date.now() + "_" + path.basename(filePath),
};

s3.read(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});
