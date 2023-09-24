const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectId } = require("mongodb"); // Import ObjectId from mongodb library
const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

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

    const blogCollection = client.db("BlogDB").collection("blogs");
    const CommentsCollection = client.db("BlogDB").collection("comments");

    app.get("/", (req, res) => {
      res.send("Doodle Blog Server Running");
    });

    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogCollection.find(query);
      const blogs = await cursor.toArray();
      res.send(blogs);
    });

    app.post("/blogs", async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog);
      res.send(result);
    });

    app.get("/comments", async (req, res) => {
      const query = {};
      const cursor = CommentsCollection.find(query);
      const comments = await cursor.toArray();
      res.send(comments);
    });

    app.post("/comments", async (req, res) => {
      const blog = req.body;
      const result = await CommentsCollection.insertOne(blog);
      res.send(result);
    });

    app.patch("/blogs/:id", async (req, res) => {
      try {
        const id = req.params.id;
        // console.log(id);
        const filter = { _id: new ObjectId(id) };
        const updatedBlog = req.body;
        const options = { upsert: true };

        const result = await blogCollection.updateOne(
          filter,
          { $set: updatedBlog },
          options
        );

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the note.");
      }
    });

    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      //   console.log(" deleted id ", id);
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      //   console.log(result);
      res.send(result);
    });

    app.listen(port, () => {
      console.log(`Doodle Blog server running on port ${port}`);
    });
  } finally {
  }
}
run().catch(console.dir);
