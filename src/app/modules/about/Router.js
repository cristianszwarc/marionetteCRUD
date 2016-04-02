import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import IndexView from './views/Index';
import HelpView from './views/Help';

// simple "module" that displays different views
export default Router.extend({
    routes: {
        'about'     : 'index',
        'about/help' : 'help'
    },

    initialize(options = {}) {
        // store the region that is assigned for this module
        this.container = options.container;

        // add this "module" to the header menu service
        HeaderService.request('add', {
          name: 'About',
          path: 'about',
          type: 'secondary'
        });
    },

    onBeforeEnter() {
        // activate this "module" on the header menu
        HeaderService.request('activate', {
          path: 'about'
        });
    },

    // render something on the container
    index() {
        this.container.show(new IndexView())
    },

    help() {
        this.container.show(new HelpView())
    }
});
