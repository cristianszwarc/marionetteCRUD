import ModalView from './Modal';
import template from '../templates/confirm.hbs';
import Backbone from 'backbone';

// a confirm view, used as an example on the ConfirmRemoval behaviour
export default ModalView.extend({
    callback: null,

        template: require('../templates/confirm.hbs'),

        events: {
            "click .confirm": "executeCallback"
        },

        initialize: function(options) {
            // store a callback function to be executed upon confirmation
            this.callback = options.callback;

            // create a model to store the texts required by the template
            // these are passed by the opotions of this view
            this.model = new Backbone.Model({
                message: this.options.message,
                title: this.options.title,
                okBtn: this.options.okBtn,
                cancelBtn: this.options.cancelBtn
            });
        },

        executeCallback: function() {
            if (typeof this.callback === "function") {
                this.callback();
            }
            this.close();
        }

});
