const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));
app.use(cors());

mongoose.connect(
  "mongodb+srv://Ayush:Ayush@cluster0.j21kj.mongodb.net/Ayush?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("Error", () => {
  console.log("Connection error");
});
db.once("open", () =>
  console.log(`Database connected on ${port} : successfully`)
);

const schemaTemplate = require("./models/ContactSchema");

app.post("/send", async (req, res) => {
  const data = await new schemaTemplate({
    name: req.body.name,
    email: req.body.email,
    project: req.body.project,
    message: req.body.message,
  });
  db.collection("userData").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    } else {
      console.log(`Data inserted`, collection);
    }
  });
  data.save();
  res.json(data);
});

app.get("/", (req, res) => {
  res.set({
    "Access-Allow-Origin-Allow": "*",
  });
  return res.redirect("index.html");
});

app.listen(port, () => {
  console.log(`Server run on ${port} : successfull`);
});
