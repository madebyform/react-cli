/*jshint esnext:true, browserify:true */
'use strict';

import 'babel/polyfill';
import 'isomorphic-fetch';
import React from 'react/addons';
import Router from 'react-router';
import StylingMixin from './utils/styling-mixin.jsx';

let Route = Router.Route;
let RouteHandler = Router.RouteHandler;

export var App = React.createClass({
  mixins: [StylingMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    return {
      isActive: false
    };
  },

  render() {

    return (
      <div style={styles.wrap}>
        <h1 style={this.mergeStyles(styles.header, this.state.isActive && styles.green)}>It works!</h1>
        <button onClick={this.toggleActive}>
          {this.state.isActive ? "Deactivate" : "Activate"}
        </button>
      </div>
    );
  },

  toggleActive() {
    this.setState({
      isActive: !this.state.isActive
    });
  }
});

let styles = {
  wrap: {
    padding: "20px"
  },
  header: {
    fontFamily: "serif",
    fontSize: "48px"
  },
  green: {
    color: "green"
  }
};

export var routes = (
  <Route name="app" path="/" handler={App} />
)

if (typeof(document) !== "undefined") {
  Router.run(routes, Router.HistoryLocation, function(Handler, state) {
    React.render(
      <Handler {...state} />,
      document.getElementById("container")
    );
  });
}
