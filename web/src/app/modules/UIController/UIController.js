import {updateActiveContainer,changeTitle,loadConnectedContainer} from 'lib/common/actions';

export default function UIController(store){
    this.dispatch=store.dispatch;
    this.store=store;
};

/**
 * Load container
 * @param {ReactComponent} Container
 * @param {Object} Info
 */
UIController.loadContainer=(Container,Info)=>{
    if (Info!='undefined') this.updateActiveContainer(Info);
    return this.dispatch(loadConnectedContainer(Container,this.store));
};
/**
 * Change windows title
 * @param {string} title
 * @returns
 */
UIController.changeTitle=(title)=>{
    return this.dispatch(changeTitle(title));
};
/**Update the active container
 * @param {Object}info
 */
UIController.updateActiveContainer=(info)=>{
    return this.dispatch(updateActiveContainer(info));

};
