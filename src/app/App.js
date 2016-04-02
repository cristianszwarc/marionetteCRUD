import $ from 'jquery';
import _ from 'lodash';
import {Application} from 'backbone.marionette';
import AppLayout from './views/AppLayout';

// this is our main application, it will render a root layout
// and will hold out modules
export default Application.extend({
  initialize() {
    this.$body = $(document.body);

    // render a base layour for this app (header/content/foot)
    this.layout = new AppLayout();
    this.layout.render();

    this._subApps = {};
  },

  // support function to instantiate and store "modules"
  addSubApp: function(name, options) {
    var subAppOptions = _.omit(options, 'subAppClass');
    var subApp = new options.subAppClass(subAppOptions);
    this._subApps[name] = subApp;
  }

});
