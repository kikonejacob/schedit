import UIController from './UIController/UIController';

const GRID_NAME='default.grid';
const CONTROLLER_NAME='basic';

export default  class  {
    constructor(options){
        this.registry=options.store;
        this.reducers=options.reducers||null;
        //console.log(this.registry);
        this.uiCtl=options.uiController|| new UIController(this.registry);
        this.dispatch=this.registry.dispatch;
        //each controller should have different following options
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas=options.schemas||{};
    };

}
