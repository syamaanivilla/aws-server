const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function deleteEmployee(nickname) {
  const params = {
    TableName: "Employees",
    Key: {
      nickname: { S: nickname },
    },
  };

  DynamoDB.deleteItem(params, function (err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(`Deleted ${nickname}`);
    }
  });
}

module.exports = {
  deleteEmployee,
};
