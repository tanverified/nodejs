const Joi = require("Joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Html & Css" },
  { id: 2, name: "JavaScript & jQuery" },
  { id: 3, name: "React & Next.js" },
  { id: 4, name: "Node & Express" },
];

app.get("/", (req, res) => {
  res.send("Server Is Live");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("404 - Course with given id not found");
  } else {
    res.send(course);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
