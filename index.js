const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Simple Node Server Running");
});

app.listen(port, () => {
  console.log(`Simple node server running on port ${port}`);
});
