import {Router} from 'backbone-routing';
import HeaderService from '../header/service';
import Layout from './views/Layout';
import FormView from './views/Form';
import ListView from './views/List';
import ConfigModel from './models/Config';
import ConfigsCollection from './collections/Configs';
import Radio from 'backbone.radio';

export default Router.extend({
    _moduleRootUrl: 'configs',  // base url used across this module to move people around
    _started: false,            // module layout status

    routes: {
      'configs'     : 'index',
      'configs/add': 'add',
      'configs/:id/edit': 'edit',
      'configs/:id/select': 'select'
    },

    initialize(options = {}) {
        // store the region that is assigned for this module
        this.container = options.container;

        // add this "module" to the header menu
        HeaderService.request('add', {
            name: 'Configs',
            path: 'configs',
            type: 'primary'
        });

        // fetch the collection of configs (the items for our CRUD)
        this.myConfigs = new ConfigsCollection();
        this.myConfigs.fetch();

    },

    onBeforeEnter() {
        // this "module" contains a layout with regions
        // when the user access to this module, the module layout is created
        // if the user swichs to other module, that is destroyed and must be recreated
        if (!this._started) {
            this.layout = new Layout();
            this.layout.on('destroy', function() {
                this._started = false;
            }.bind(this));
            this._started = true;
        }

        // render this module layout
        this.container.show(this.layout)

        // activate this "module" on the header menu
        HeaderService.request('activate', {
          path: this._moduleRootUrl
        });

    },

    index() {
        // show a list of items in the content region of this module's layout
        this.layout.content.show(new ListView({
            collection: this.myConfigs
        }))
    },

    add() {
        // create a form with a new empty config
        var formView = new FormView({
            model: new ConfigModel(),
            collection: this.myConfigs,
            router: this
        });

        // display the form
        this.layout.content.show(formView)
    },

    edit(id) {
        // get the model to be edited or return to the list
        var modelToEdit = this.myConfigs.findWhere({'id': id});
        if (!modelToEdit) {
            this.navigate(this._moduleRootUrl, { trigger: true });
        }

        // create form with the model
        var formView = new FormView({
            model: modelToEdit,
            collection: this.myConfigs,
            router: this
        });

        // display the form
        this.layout.content.show(formView)
    },

    select(id) {
        // get the model to be selected
        var modelToSelect = this.myConfigs.findWhere({'id': id});

        // broadcast the selection of a config
        if (modelToSelect) {
            Radio.channel('configs').trigger('select', modelToSelect);
        }

        this.navigate(this._moduleRootUrl, { trigger: true });
    }

});
