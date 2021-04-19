// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// ECMAScript defines a string interchange format for date-times based upon a simplification of the ISO 8601 calendar date extended format. 
// The format is as follows: YYYY-MM-DDTHH:mm:ss
app.get("/api/:date?", function(req, res) {
  if (!req.params.date) {
    res.json({ unix: Date.now(), utc: new Date(Date.now()).toUTCString() });
  }
  else if (req.params.date.includes('-')) {
    if (new Date(req.params.date).toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString() });
    }
  }
  else {
    if (new Date(req.params.date).toString() !== "Invalid Date") {
      res.json({ unix: new Date(req.params.date).getTime(), utc: new Date(req.params.date).toUTCString() });
    } else {
      res.json({ unix: Number(req.params.date), utc: new Date(Number(req.params.date)).toUTCString() });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
