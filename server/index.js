const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const studentmodel = require("./model/student");

const PORT = 8000;
const URL = "mongodb+srv://ababab:12345@cluster0.2zbjj.mongodb.net/student";
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((e) => {
    console.log(e.message);
  });
app.use(express.json());
app.use(cors());

app.post("/insert", async (req, res) => {
  const { name, email, phone, phy, chem, math } = req.body;
  console.log(name, phone, email);
  const student = new studentmodel({
    name,
    email,
    phone,
    physics: phy,
    chemistry: chem,
    math,
  });

  try {
    const resp = await student.save();
    console.log(resp);
    res.send("inserteed data");
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  try {
    const data = await studentmodel.find({});
    res.send(data);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

app.put("/update", async (req, res) => {
  const newemail = req.body.newemail;
  const id = req.body.id;

  try {
    await studentmodel.findById(id, (error, updateemail) => {
      updateemail.email = newemail;
      updateemail.save();
      res.send("update done");
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
