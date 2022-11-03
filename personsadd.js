const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function addpersons(personid, lastname, firstname, address, city) {
  const params = {
    TableName: "persons",
    Item: {
      personid: { N: personid },
      lastname: { S: lastname },
      firstname: { S: firstname },
      address: { S: address },
      city: { S: city },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add movie", err);
    } else {
      console.log(
        `Added ${personid} with a Rotten Tomatoes Score of ${lastname} ${firstname} ${address} ${city}%`
      );
    }
  });
}

module.exports = {
  addpersons,
};
