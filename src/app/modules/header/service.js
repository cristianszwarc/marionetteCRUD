import Service from 'backbone.service';
import {Collection} from 'backbone';
import View from './view';

// the header "service", is a backbone.service that allows
// other modules to attach themselves into the header menu and
// highlight the correct menu item when one module is being executed
// this is *one way* to do calls to a common piece of code
const HeaderService = Service.extend({
  // receive the target container where this module should be rendered
  setup(options = {}) {
    this.container = options.container;
  },

  // render the header menu as soon this service is started (this happens once)
  start() {
    this.collection = new Collection();
    this.view = new View({ collection: this.collection });
    this.container.show(this.view); // renders the view in the target container
  },

  // define the calls available for this service
  requests: {
    add: 'add',
    remove: 'remove',
    activate: 'activate'
  },

  // adds a module to the header menu
  add(model) {
    this.collection.add(model);
  },

  // removes a module to the header menu
  remove(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  },

  // show module as active
  // the view is listening for any changes, so, no render calls required
  activate(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      model.set('active', true);
    }
  }
});

export default new HeaderService();
