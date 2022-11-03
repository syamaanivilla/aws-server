const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function getEmployee(nickname) {
  const params = {
    TableName: "Employees",
    Key: {
      per: { S: nickname },
    },
  };

  DynamoDB.getItem(params, function (err, data) {
    if (err) {
      console.error("Unable to find employees", err);
    } else {
      console.log("Found employee", data.Item);
    }
  });
}

module.exports = {
  getEmployee,
};
