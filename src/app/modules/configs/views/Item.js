import {ItemView} from 'backbone.marionette';
import template from '../templates/item.hbs';
import ConfirmRemoveBehaviour from '../../../behaviours/ConfirmRemove';

export default ItemView.extend({
    template: template,
    modelEvents: {
        'change': 'render'
    },

    ui: {
        remove: '.remove'   // required by the ConfirmRemove behavior
    },

    behaviors: {
        ConfirmRemove: {
            // the behaviour class to be used
            behaviorClass: ConfirmRemoveBehaviour,

            // set optional texts for the confirm dialog
            message: "Delete this config?",
            okBtn: "Delete",

            // an action is required by the ConfirmRemove behavour
            removeAction: function(thisView) {  // thisView is injected by the ConfirmRemove behavour
                thisView.model.destroy();
            }
        }
    }
});
