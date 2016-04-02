import {Collection} from 'backbone';
import ConfigModel from '../models/Config';
import LocalStorage from 'backbone.localstorage';

export default Collection.extend({
    localStorage: new LocalStorage("configs"),
    model: ConfigModel
});
