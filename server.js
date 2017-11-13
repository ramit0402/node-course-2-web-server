const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method}: ${request.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
      if(error) {
        console.log('Unable to append to server log.');
      }
    });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>  {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>  {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'My Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (request,  response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request,  response) => {
  response.send({
    errorMessage: 'Unable to handel request'
  });
});


app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
