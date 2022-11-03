// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "ap-south-1" });

// Create DynamoDB service object
var ddb = new AWS.DynamoDB();

var params = {
  RequestItems: {
    Store: [
      {
        PutRequest: {
          Item: {
            gadjets: { S: "watches" },
            mobiles: { S: "motorola" },
            vegetables: { S: "califlower" },
            drinks: { S: "thumsup" },
            orders: { N: "5" },
            groceries: { S: "pulses" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            gadjets: { S: "ac" },
            mobiles: { S: "redme" },
            vegetables: { S: "greens" },
            drinks: { S: "sprite" },
            orders: { N: "7" },
            groceries: { S: "daal" },
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
