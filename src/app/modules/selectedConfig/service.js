import Radio from 'backbone.radio';
import {Model} from 'backbone';
import View from './view';
import {Object} from 'backbone.marionette';

const selectedConfigService = Object.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  initialize: function(options) {
      // when a config is selected, the config is broadcast by Radio
      // we can listen that and react
      // Note that this is a clone of the original model, changes to the
      // original model are not reflected here.
      Radio.channel('configs').on('select', function(configModel) {
          this.model = configModel;
          this.view = new View({ model: this.model });
          this.container.show(this.view);
      }.bind(this));

      // return the current selected config
      Radio.channel('configs').on('selected', function() {
          return this.model;
      }.bind(this));

  }

});

export default new selectedConfigService();
