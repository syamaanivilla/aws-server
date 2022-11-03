const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function updateEmployeesalary(nickname, salary) {
  const params = {
    TableName: "Employees",
    Item: {
      nickname: { S: nickname },
      salary: { N: salary.toString() },
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(`Updated ${nickname} with new RT Score of ${salary}%`);
    }
  });
}

module.exports = {
  updateEmployeesalary,
};
