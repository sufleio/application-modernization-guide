const AWS = require("aws-sdk");
const ddbClient = new AWS.DynamoDB.DocumentClient({
  region: "eu-west-1",
});

exports.create = async (event, context) => {
  const body = JSON.parse(event.body);
  const { id, ...rest } = body;
  try {
    await ddbClient
      .put({
        TableName: "MyTable",
        Item: {
          PK: id,
          ...rest,
        },
      })
      .promise();
    return {
      statusCode: 200,
      body: {
        status: "OK",
      },
      headers: {
        "content-type": "application/json",
      },
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
    };
  }
};

exports.detail = async (event, context) => {
  try {
    const id = event.pathParameters.id;
    console.log("id:", id);
    const item = await ddbClient
      .get({
        TableName: "MyTable",
        Key: {
          PK: id,
        },
      })
      .promise();
    return {
      statusCode: 200,
      body: item.Item,
    };
  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
    };
  }
};

exports.query = async (event, context) => {
  try {
    let params = {
      TableName: "MyTable",
      IndexName: "FindByTypeByName",
      ExpressionAttributeNames: {
        "#student_name": "name",
        "#role_type": "type"
      },
      ExpressionAttributeValues: {
        ":q": event.queryStringParameters.text,
        ":role_type": "student",
      },
      KeyConditionExpression: "#role_type = :role_type and begins_with(#student_name, :q)",
    };
    const data = await ddbClient.query(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

    if (event.queryStringParameters.text) {
  
    }

  } catch (ex) {
    console.error(ex);
    return {
      statusCode: 500,
      body: JSON.stringify(ex)
    };
  }
};
