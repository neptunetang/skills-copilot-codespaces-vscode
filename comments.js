// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());

app.post('/comments', function(req, res) {
  var comments = [];
  var comment = req.body.comment;
  var name = req.body.name;
  var email = req.body.email;
  var date = req.body.date;

  // Check if the comments.json file exists
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      // If the file does not exist, create it
      fs.writeFile('comments.json', JSON.stringify(comments));
    } else {
      // If the file exists, read it
      comments = JSON.parse(data);
    }

    // Add the new comment to the comments array
    comments.push({
      comment: comment,
      name: name,
      email: email,
      date: date
    });

    // Write the new comments array to the file
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
      if (err) {
        res.status(500).send('Error saving comment');
      } else {
        res.status(200).send('Comment saved');
      }
    });
  });
});

app.get('/comments', function(req, res) {
  // Read the comments.json file
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments');
    } else {
      // Parse the comments data
      var comments = JSON.parse(data);
      res.status(200).send(comments);
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});