import {ItemView} from 'backbone.marionette';
import template from '../templates/form.hbs';

export default ItemView.extend({

  template: template,

  events: {
        'click button': 'saveItem'
    },

  modelEvents: {
        'change': 'render'
    },

  ui: {
        client_id: '#client_id',
        client_secret: '#client_secret'
    },

  saveItem() {
      // set the values from the UI to the model
      this.model.set({
          client_id: this.ui.client_id.val(),
          client_secret: this.ui.client_secret.val()
      });

      // when adding
      if (!this.model.get('id')) {
          this.collection.add(this.model);
      }

      // save the model (commits to storage)
      this.model.save();

      // not required, just a cleaning example
      this.model = null;
      this.ui.client_id.val('');
      this.ui.client_secret.val('');

      this.options.router.navigate(this.options.router._moduleRootUrl, { trigger: true });
  }

});
