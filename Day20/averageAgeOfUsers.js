const { MongoClient } = require("mongodb");
async function averageAgeOfUsers(req, res) {
  try {
    const client = new MongoClient("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    const db = client.db("Scaler_30_Days_NodeJS");
    const usersCollection = db.collection("users");

    const result = await usersCollection
      .aggregate([
        {
          $group: {
            _id: null,
            averageAge: { $avg: "$age" },
          },
        },
      ])
      .toArray();
    await client.close();
    res.json({ averageAge: result[0].averageAge });
  } catch (error) {
    console.error("Error calculating average age:", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating the average age." });
  }
}

module.exports = averageAgeOfUsers;
