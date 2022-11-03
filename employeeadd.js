const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function addEmployee(nickname, salary) {
  const params = {
    TableName: "Employees",
    Item: {
      nickname: { S: nickname },
      salary: { N: salary },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add movie", err);
    } else {
      console.log(
        `Added ${nickname} with a Rotten Tomatoes Score of ${salary}%`
      );
    }
  });
}

module.exports = {
  addEmployee,
};
