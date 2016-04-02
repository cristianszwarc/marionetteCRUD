import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import IndexView from './indexView';

// index page for our application
export default Router.extend({

  // receive the target container where this module should be rendered
  initialize(options = {}) {
    this.container = options.container;

    // add this "module" to the header menu service
    HeaderService.request('add', {
      name: 'Home',
      path: '',
      type: 'primary'
    });

  },

  onBeforeEnter() {
    // activate the correct menu item on the header service
    HeaderService.request('activate', {
      path: ''
    });
  },

  // routes defined for this module
  routes: {
    '': 'index'
  },

  // action for the index route
  index() {
    // render something into the container defined for this module
    this.container.show(new IndexView())
  }
});
