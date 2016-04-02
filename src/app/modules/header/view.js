import _ from 'lodash';
import {history} from 'backbone';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

// header menu view
export default ItemView.extend({
  template: template,
  tagName: 'nav',
  className: 'header navbar navbar-default navbar-fixed-top',

  attributes: {
    role: 'navigation'
  },

  // render this view after any change to the collection
  collectionEvents: {
    all: 'render'
  },

  // templateHelpers can be accessed from the handle bars templates
  templateHelpers() {
    return {
      primaryItems   : this.serializeWhere({ type: 'primary' }),
      secondaryItems : this.serializeWhere({ type: 'secondary' })
    };
  },

  serializeWhere(props) {
    return _.invoke(this.collection.where(props), 'toJSON');
  },

  // list UI items, this replaces the way of selecting elements: $myCollapseItem = this.$('#mySelector')
  ui: {
    collapse: '#navbar-collapse'
  },

  events: {
    'show.bs.collapse #navbar-collapse' : 'onCollapseShow'
  },

  onCollapseShow() {
    this.listenToOnce(history, 'route', () => {
      this.ui.collapse.collapse('hide');
    });
  }
});
