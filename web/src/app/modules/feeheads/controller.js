import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import List from './containers/list';
import Form from './containers/form';

//module json schemas
import * as FormSchema from './schemas/form.schema.json';
import * as ListSchema from './schemas/list.schema.json';
//external actions
import {initGridFromSchema} from 'lib/grid/actions.js';

//module actions
import {getFeeHead,setFeeHead,createFeeHead} from './lib/actions';
import {FORM_TITLE,FORM_SHOW_TITLE,FORM_CREATE_TITLE,GRID_NAME,
        CONTROLLER_NAME,MODULE_ICON,MODULE_REGISTERED_NAME} from './lib/consts';
import {reducers} from './lib/reducers';


export default  class extends Controller {
    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema,FormSchema};
        this.registeredName=MODULE_REGISTERED_NAME;
    };
    /**
     * index display list of level fees
     * @param  {Object} options [receive levelId]
     * @return void
     */
    index(options)
    {
        const page=(typeof Number(options[0])=='number' && options[0]!=='undefined')?Number(options[0]):1;
        this.dispatch(initGridFromSchema(this.schemas.ListSchema,null,{currentPage:page}));
        this.uiCtl.loadContainer(<List schema={this.schemas.ListSchema} uiCtl={this.uiCtl} />);
        this.uiCtl.changeTitle(this.schemas.ListSchema.title,MODULE_ICON);
    }

    /**
     * create  create a new  subject
     * @return {void}
     */
    create(){
        const resourceId='';
        const Container=(<Form rawSchema={this.schemas.FormSchema}
                               data={{classId:-1}}
                               uiCtl={this.uiCtl}
                               dataId={resourceId}
                               onSubmitForm={createFeeHead}
                               />);
        this.uiCtl.loadContainer(Container,{resourceId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE,MODULE_ICON);
    }

    /**
     * Edit edit dialog for level fees
     * @param  {Array} options Represent Url options
     * @return {void}         description
     */
    edit(options){
        const feeCode=options[0];
        const Container=(<Form schema={this.schemas.FormSchema}
                               datasource={'feeeHeads'}
                               dataId={feeCode} uiCtl={this.uiCtl}
                               onSubmitForm={setFeeHead}
                         />);
        this.dispatch(getFeeHead(feeCode));
        this.uiCtl.loadContainer(Container,{feeCode});
        this.uiCtl.changeTitle(FORM_TITLE,MODULE_ICON);

    }

    show(options){
        const feeCode=options[0];
        const Container=(<Form schema={this.schemas.FormSchema}
                               datasource={'feeHeads'}
                               dataId={feeCode}
                               onSubmitForm={setFeeHead}
                               uiCtl={this.uiCtl}
                        />);
        this.dispatch(getFeeHead(feeCode));
        this.uiCtl.changeTitle(FORM_SHOW_TITLE,MODULE_ICON);
        this.uiCtl.loadContainer(Container,{feeCode});


    }
    /** The modules reducers*/
    static reducers(){
        return reducers;
    }
    getRoute(To){
        return this.registeredName+'#'+To;
    }
    static routes() {
        return {
            'fee-heads': this.getRoute('index'),
            'fee-heads/create': this.getRoute('create'),
            'fee-heads/:id': this.getRoute('show'),
            'fee-heads/:id/edit': this.getRoute('edit')
        };
    }

}
