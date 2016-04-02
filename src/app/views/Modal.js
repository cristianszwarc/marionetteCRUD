import {ItemView} from 'backbone.marionette';

// a base view for modals
export default ItemView.extend({
    className: "modal fade",

      attributes: {
          'data-backdrop': 'static',
          'data-keyboard': 'false'
      },

      show: function ()
      {
          this.$el.modal('show').
              on('shown', this.onShow).
              on('hidden', this.onHide);
      },

      close: function()
      {
          this.$el.modal('hide');
      },

      onShow: function ()
      {

      },

      onHide: function ()
      {
          this.remove();
      }
});
