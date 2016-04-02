import {LayoutView} from 'backbone.marionette';
import template from '../templates/appLayout.hbs';

// a root layout for our application
export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    selectedConfig: '.application__selectedConfig',
    flashes : '.application__flashes',
    content : '.application__content',
    overlay : '.application__overlay',
    footer : '.application__footer'
  }
});
