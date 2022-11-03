const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});

const DynamoDB = new AWS.DynamoDB();

function updatestoremobiles(
  gadjets,
  mobiles,
  vegetables,
  drinks,
  orders,
  groceries
) {
  const params = {
    TableName: "Store",
    Item: {
      gadjets: { S: gadjets },
      mobiles: { S: mobiles.toString() },
      vegetables: { S: vegetables },
      drinks: { S: drinks },
      orders: { N: orders },
      groceries: { S: groceries },
    },
    ReturnConsumedCapacity: "TOTAL",
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to find movie", err);
    } else {
      console.log(
        `Updated ${gadjets} with new RT Score of ${vegetables}  ${mobiles} ${drinks} ${orders} ${groceries} %`
      );
    }
  });
}

module.exports = {
  updatestoremobiles,
};
