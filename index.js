const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://blogs:0pFVdOlE0OotVr2m@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.get("/", (req, res) => {
      res.send("Doodle Blog Server Running");
    });

    app.listen(port, () => {
      console.log(`Doodle Blog server running on port ${port}`);
    });
  } finally {
  }
}
run().catch(console.dir);
