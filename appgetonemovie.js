const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function getMovie(title) {
  const params = {
    TableName: "Movies",
    Key: {
      title: { S: title },
    },
  };

  DynamoDB.getItem(params, function (err, data) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log("Found movie", data.Item);
    }
  });
}

module.exports = {
  getMovie,
};
