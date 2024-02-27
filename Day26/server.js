const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'myapp';

const collectionName = 'products';

const client = new MongoClient(url);

async function addProduct(product) {
  try {
    await client.connect();
    console.log('Connected to the MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(product);
    console.log(`Product inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
    console.log('Disconnected from the MongoDB server');
  }
}
async function getProductStatistics() {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" }
        }
      }
    ];
  
    const result = await db.collection.aggregate(pipeline).toArray();
    return result[0];
    console.log(result)
  }
  