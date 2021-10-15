const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const config = require('config')
const helmet = require('helmet');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const authenticate = require('./authenticate')

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app : ${app.get('env')}`);
app.use('/api/courses',courses)
app.use('/', home)

app.use(express.json());
app.use(logger);
app.use(authenticate);

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(helmet());

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('morgan enabled...');
}
// // db
// dbDebugger('Connected to database....')

// Configuration
// console.log('Application Name : ' + config.get('name'));
// console.log('Mail server : ' + config.get('mail.host'));
// console.log('Mail password : ' + config.get('mail.password'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));