import {LayoutView} from 'backbone.marionette';
import template from '../templates/layout.hbs';

export default LayoutView.extend({
  template: template,

  regions: {
    content  : '.content'
  }
});
