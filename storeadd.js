const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-south-1", // replace with your region in AWS account
});
const DynamoDB = new AWS.DynamoDB();
function addStore(gadjets, mobiles, vegetables, drinks, orders, groceries) {
  const params = {
    TableName: "Store",
    Item: {
      gadjets: { S: gadjets },
      mobiles: { S: mobiles },
      vegetables: { S: vegetables },
      drinks: { S: drinks },
      orders: { N: orders },
      groceries: { S: groceries },
    },
  };
  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add movie", err);
    } else {
      console.log(
        `Added ${gadjets} with a Rotten Tomatoes Score of ${mobiles}   cncj ${vegetables}   ${drinks}  ${orders}  ${groceries} %`
      );
    }
  });
}
module.exports = {
  addStore,
};
