import stringRes from 'utils/stringRes';
import List from './containers/list';
//import DeleteList from './containers/delete';
import Form from './containers/form';
import servicesChannels from 'services/servicesChannels';
import React from 'react';

import { Provider } from 'react-redux';
import {levelfeeGet,levelfeeSave,levelfeeCreate,levelfeeDelete,
       levelfeesDelete,initLevelfeeGrid} from './lib/actions.js';
import {refreshGridOptions} from 'lib/grid/actions.js';
import {refreshCollection} from 'lib/collections/actions';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';


const API_URL='../api/levels/:id/fees';
const FORM_TITLE='Fees';
const FORM_CREATE_TITLE='Create level fee';
const LIST_TITLE='Fees list';
const DELETE_CONFIRM='Are you sure you want to delete these items ?';


export default  class  {
    constructor(options){
        this.services = servicesChannels('services');
        console.log('creating controller..');
        this.title = stringRes.studentBasic;
        this.gridName='level.fees.grid';
        this.registry=options.store;
        this.reducers=null;
        this.current = null;
    };
    handleIndexActions(action,selectedRowIds,dispatch){
        switch (action) {
        case 'multiselect':
            //console.log('ACT');
            dispatch(refreshGridOptions({multiselect:true,selectedRowIds:[]},this.gridName));
            break;
        case 'delete':
            let confirmResult=confirm(DELETE_CONFIRM);
            if (confirmResult==true)
            {
                dispatch(levelfeesDelete(selectedRowIds));
                dispatch(refreshCollection(this.gridName));
            }
            break;
        case 'cancel_multiselect':
            dispatch(refreshGridOptions({multiselect:false},this.gridName));
            break;
        default:

        }

    }
    /**
     * [index display list of level fees]
     * @param  {[object]} options [receive levelId]
     * @return {[void]}         []
     */
    index(options)
    {
        let levelId=options[0];
        this.current=levelId;
        let header={ description:'index',
            onAction:this.handleIndexActions.bind(this)};
        this.registry.dispatch(initLevelfeeGrid(levelId,this.gridName));


    //    let {options}=this.registry.getState().collections[this.gridName];
        let Container= (<Provider store={this.registry}>
                          <List
                                gridName={this.gridName}
                                urlgroup={this.current}
                                {...header} />
                        </Provider>);


        this.registry.dispatch(updateActiveContainer({levelId:levelId}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(LIST_TITLE));
    }
    /**
     * [handleEditSubmit handle user form control ]
     * @param  {event} e      [description]
     * @param  {object} data   [data  to be saved]
     * @param  {string} action [type of  action selected by user]
     * @return {void}        [description]
     */
    handleCreateSubmit(e,data,action){
        switch(action)
        {
        case 'cancel':
            this.services.trigger('routeBack');
            break;

        case 'submit':
            this.registry.dispatch(levelfeeCreate(data.levelid,data.id,data));
        }
    }

    /**
     * [create  create a new level fee]
     * @param  {object} options [ passing levelId]
     * @return {[void]}         []
     */
    create(options){
        let levelid=options.levelid;
        let Container= (<Provider store={this.registry}>
                          <Form  data={{feedCode:-1,levelid}} onSubmitForm={this.HandleCreateSubmit.bind(this)} />
                        </Provider>);
        this.registry.dispatch(updateActiveContainer({feedCode:-1}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_CREATE_TITLE));
    }

    /**
     * [handleEditSubmit handle user form control ]
     * @param  {event} e      [description]
     * @param  {object} data   [data  to be saved]
     * @param  {string} action [type of  action selected by user]
     * @return {voided}        [description]
     */
    handleEditSubmit(e,data,action){
        switch(action)
        {
        case 'cancel':
            this.services.trigger('routeBack');
            break;
        case 'submit':
            this.registry.dispatch(levelfeeSave(data.levelid,data.id,data));
        }
    }
    /**
     * [edit edit dialog for level fees]
     * @param  {[object]} options [url options]
     * @return {[void]}         [description]
     */
    edit(options){
        //console.log(options);
        let levelid=options[0];
        let feeCode=options[1];
        this.current=feeCode;
        let Container= (<Provider store={this.registry}>
                          <Form onSubmitForm={this.handleEditSubmit.bind(this)} />
                        </Provider>);
        this.registry.dispatch(levelfeeGet(levelid,feeCode));
        this.registry.dispatch(updateActiveContainer({feeCode}));
        this.registry.dispatch(loadContainer(Container));
        this.registry.dispatch(changeTitle(FORM_TITLE));
    }
}
