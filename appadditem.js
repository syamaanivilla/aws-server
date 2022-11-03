const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function addMovie(title, rtScore) {
  const params = {
    TableName: "Movies",
    Item: {
      title: { S: title },
      rtScore: { N: rtScore },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add movie", err);
    } else {
      console.log(`Added ${title} with a Rotten Tomatoes Score of ${rtScore}%`);
    }
  });
}

module.exports = {
  addMovie,
};
