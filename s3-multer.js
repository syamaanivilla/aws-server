const AWS = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3-v2");

const app = express();
// Setup your S3 bucket here
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: "AKIAT63RPD3AZTGNCIJW",
    secretAccessKey: "ZlLcoDMO6AKUM2L6To87RDM1Jo/FW69+YDOg9/nX",
  },
  region: "ap-south-1",
});
// Init multer upload with your options

const upload = multer({
  storage: multerS3({
    s3: s3, // Can be used with shorthand expression
    bucket: "mysamplebuck97", // Your bucket name goes here
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
      // The metadata you want to send.
    },
    acl: "public-read", // Optional ACL
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + ".txt"); // Either return a new unique value or use date as uuid
      // Be sure to add + ".your_file_extension" since it will not be automatically added.
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // If you want multer to detect automatically
    // Else The optional contentType option can be used to set Content/mime type of the file. By default the content type is set to application/octet-stream
  }),
});

app.post("/upload", upload.single("file"), function (req, res, next) {
  res.send("Successfully uploaded ");
});
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
