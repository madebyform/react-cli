/*jshint node:true */
'use strict';

// Start by registering a hook that makes calls to `require` run ES6 code
// This will be the only file where JSX and ES6 features are not supported
require('babel/register');

var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var express = require('express');
var cachify = require('connect-cachify');
var ejs = require('ejs');
var server = express();

// List of assets where the keys are your production urls, and the value
// is a  list of development urls that produce the same asset
var assets = {
  "/app.min.js": [ "/app.js" ]
};

// Enable browser cache and HTTP caching (cache busting, etc.)
server.use(cachify.setup(assets, {
  root: "assets",
  production: (process.env.NODE_ENV != "development")
}));

// Serve static files
// TODO: remember to put the favicon and other relevant stuff there.
server.use('/', express.static('assets'));

// Use Embedded JavaScript to embed the output from React into our layout
server.set('view engine', 'ejs');
server.set('views', 'src/views');

// Require and wrap the React main component in a factory before calling it
// This is necessary because we'll do `App()` instead of <App />
var routes = require("./app.jsx").routes;

// Redirect the user to the list of native components for iOS
server.get('/', function(req, res) {
  Router.run(routes, req.url, function (handler, state) {
    // Render the app and send the markup for faster page loads and SEO
    // On the client, React will preserve the markup and only attach event handlers
    var Handler = React.createFactory(handler);
    var content = new Handler({
      params: state.params,
      query: state.query

      // TODO: pass any additional initial state data here

    });
    var output = React.renderToString(content);

    res.render('template', {
      output: output

      // TODO: pass any additional initial state data here
    });
  });
});

// Listen for connections
server.listen(process.env.PORT || 8080, function() {
  console.log('Server is listening...');
});
