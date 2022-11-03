const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function deleteStore(gadjets) {
  const params = {
    TableName: "Store",
    Key: {
      gadjets: { S: gadjets },
    },
  };

  DynamoDB.deleteItem(params, function (err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(`Deleted ${gadjets}%`);
    }
  });
}

module.exports = {
  deleteStore,
};
