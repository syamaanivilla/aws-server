const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function createTable() {
  const params = {
    TableName: "persons",
    KeySchema: [{ AttributeName: "title", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "title", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  DynamoDB.createTable(params, function (err, data) {
    if (err) {
      console.error("Unable to create table", err);
    } else {
      console.log("Created table", data);
    }
  });
}

module.exports = {
  createTable,
};
