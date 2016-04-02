import './plugins'; // load js vendors first

import Backbone from 'backbone';
import $ from 'jquery';

import Application from './app/App';
import AboutModule from './app/modules/about/Router';
import ConfigsModule from './app/modules/configs/Router';
import HeaderService from './app/modules/header/service';
import SelectedConfigService from './app/modules/selectedConfig/service';
import IndexRouter from './app/modules/index/Router';

// instantiate the main application
// this renders a base application layout
// that can be then used by the modules/services/subApps
let app = new Application();

// the header "service", is a backbone.service that allows
// other modules to attach themselves into the header menu and
// highlight the correct menu item when one module is being executed
// this is *one way* to do calls to a common piece of code
HeaderService.setup({
  container: app.layout.header
});

// the SelectedConfigService, is another way to communicate different
// parts of the application, this example is using Radio to achieve
// the same functionallity than the header using backbone.service
SelectedConfigService.setup({
  container: app.layout.selectedConfig
});

// append each module to the application
// these modules are made using a Router as the start point
// while "services" are already instantiated, modules will be instantiated
// by addSubApp()
app.addSubApp('indexModule', {                  // a name is specified to hold this in the array of modules/subApps
  subAppClass: IndexRouter,                     // the module class (marionette object or controller when using routes)
  container: app.layout.content,                // pass in the region where this module will be rendered
  exampleOption: 'other value'                  // other parameters could be passed in
});

app.addSubApp('aboutModule', {
  subAppClass: AboutModule,
  container: app.layout.content
});

app.addSubApp('configsModule', {
  subAppClass: ConfigsModule,
  container: app.layout.content
});

Backbone.history.start();
