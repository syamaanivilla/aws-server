const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: "AKIAWSSKOCVAZDQCDHWK",
  secretAccessKey: "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",
  Bucket: "rajusamplebuck1",
});

const params = {
  Bucket: "rajusamplebuck1",
  Key: "myfiles/1666076084437_file.txt",
};

s3download = function (params) {
  return new Promise((resolve, reject) => {
    s3.createBucket(
      {
        Bucket: "rajusamplebuck1",
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
