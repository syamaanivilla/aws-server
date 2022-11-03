const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function getAllEmployees() {
  const params = {
    TableName: "Employees",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find employee", err);
    } else {
      console.log(`Found ${data.Count} employees`);
      console.log(data.Items);
    }
  });
}

module.exports = {
  getAllEmployees,
};
