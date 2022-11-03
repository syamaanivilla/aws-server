const AWS = require("aws-sdk");

//configuring the AWS environment
AWS.config.update({
  accessKeyId: "AKIAT63RPD3AZTGNCIJW",
  secretAccessKey: "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",
});

const s3 = new AWS.S3();
var filePath = "./file.txt";
const params = {
  Bucket: "mysamplebuck97",
  Key: "myfiles/1666076361306_file.txt",
};

s3download = function (params) {
  return new Promise((resolve, reject) => {
    s3.createBucket(
      {
        Bucket: "mysamplebuck97",
      },
      function () {
        s3.getObject(params, function (err, data) {
          if (err) {
            reject(err);
          } else {
            console.log("Successfully dowloaded data from bucket");
            resolve(data);
          }
        });
      }
    );
  });
};
s3download(params);
