import {Behavior} from 'backbone.marionette';
import ConfirmView from '../views/Confirm.js';

// shows a confirm dialog before removing something
// it will react to a click into @ui.remove
// and it expects to have a removeAction callback set on the Behavior options
export default Behavior.extend({
    defaults: {
        "message": "Are you sure?",
        "title": "Confirm",
        "okBtn": "Yes",
        "cancelBtn": "Cancel"
    },

    events: {
        "click @ui.remove": "confirmRemove"
    },

    confirmRemove: function() {
        // create a wrap function to pass the original view to removeAction
        // the wrapped function is then used as the callback of the ConfirmView
        // (other way?)
        this.options.callback = function(){
            this.options.removeAction(this.view);
        }.bind(this);

        // create a confirm dialog by using the ConfirmView
        var ConfirmDialog = new ConfirmView(this.options);
        ConfirmDialog.render().show();
    }
});
