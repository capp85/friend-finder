var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./routing/apiRoutes')(app);
require('./routing/htmlRoutes')(app);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public'));
});


app.listen(PORT, function () {
  console.log('Listening on port: ' + PORT);
});