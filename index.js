const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const students = await prisma.students.findMany();
    res.render("index", { students });
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR");
  }
});

app.get("/add-student", (req, res) => {
  res.render("addStudent");
});

app.post("/add-student", async (req, res) => {
  try {
    const { name, surname, age } = req.body;
    await prisma.students.create({
      data: {
        name,
        surname,
        age: parseInt(age),
      },
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("ERROR");
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
