// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "ap-south-1" });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB();

var params = {
  RequestItems: {
    Employees: [
      {
        PutRequest: {
          Item: {
            nickname: { S: "raju" },
            salary: { N: "30000" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            nickname: { S: "renu" },
            salary: { N: "60000" },
          },
        },
      },
    ],
  },
};

ddb.batchWriteItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
