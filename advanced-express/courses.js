const morgan = require('morgan')
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./logger');
const authenticate = require('./authenticate')

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app : ${app.get('env')}`);

app.use(express.json());
app.use(logger);
app.use(authenticate);

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(helmet());

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('morgan is enabled...');
}


const courses = [
  { id: 1, name: 'JavaScript' },  
  { id: 2, name: 'React' },  
  { id: 3, name: 'Node' },  
];

app.get('/', (req, res) => {
  res.send("Course API - Server is Live");
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  const { error } = validateCourse(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  course.name = req.body.name; 
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The genre with the given ID was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The genre with the given ID was not found.');
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));