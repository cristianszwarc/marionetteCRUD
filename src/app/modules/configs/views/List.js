import {CollectionView} from 'backbone.marionette';
import Item from './Item';
import EmptyListView from './Empty';

export default CollectionView.extend({
    childView: Item,
    emptyView: EmptyListView
});
