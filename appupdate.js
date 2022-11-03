const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function updateMovieScore(title, newRtScore) {
  const params = {
    TableName: "Movies",
    Item: {
      title: { S: title },
      rtScore: { N: newRtScore.toString() },
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  DynamoDB.putItem(params, function(err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(`Updated ${title} with new RT Score of ${newRtScore}%`);
    }
  });
}

module.exports = {
  updateMovieScore,
};