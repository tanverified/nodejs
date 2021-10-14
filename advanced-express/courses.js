const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "Html,CSS & JavaScript" },
  { id: 2, name: "React & Next.js" },
  { id: 3, name: "Node & Express" },
  { id: 4, name: "Python & Djaango" },
];

app.get("/", (req, res) => {
  res.send("Server Is Live");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("404 - Course with given ID not found");
  }

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = { name: Joi.string().min(3).required() };
  return Joi.validate(course, schema);
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).send("404 - Course with given ID not found");
  } else {
    res.send(course);
  }
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("404 - Course with given ID not found");

  const index = courses.indexOf(course)
  courses.splice(index,1)

});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
