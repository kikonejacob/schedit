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
import {getSubject,setSubject} from './lib/actions';
//module reducers
import reducers from './lib/reducers';



const FORM_TITLE='Subject';
const FORM_SHOW_TITLE='Subject';
const FORM_CREATE_TITLE='Create a new subject head';

const GRID_NAME='subjects.grid';
const CONTROLLER_NAME='subjects.controller';
const MODULE_ICON='fa-cogs';


export default  class extends Controller {
    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema,FormSchema};
    };
    /**
     * index display list of level fees
     * @param  {[object]} options [receive levelId]
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
        const classId=-1;
        const Container=(<Form rawSchema={this.schemas.FormSchema} data={{classId:-1}} uiCtl={this.uiCtl} dataId={classId} />);
        this.uiCtl.loadContainer(Container,{classId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE,MODULE_ICON);
    }

    /**
     * Edit edit dialog for level fees
     * @param  {Object} options Represent Url options
     * @return {void}         description
     */
    edit(options){
        const subjectCode=options[0];
        const Container=(<Form schema={this.schemas.FormSchema}
                                datasource={'subjects'}
                                dataId={subjectCode} uiCtl={this.uiCtl}
                                onSubmitForm={setSubject}
                         />);
        this.dispatch(getSubject(subjectCode));
        this.uiCtl.loadContainer(Container,{subjectCode});
        this.uiCtl.changeTitle(FORM_TITLE,MODULE_ICON);

    }

    show(options){
        const subjectCode=options[0];
        const Container=(<Form schema={this.schemas.FormSchema}
                               datasource={'subjects'}
                               dataId={subjectCode}
                               onSubmitForm={setSubject}
                               uiCtl={this.uiCtl}
                        />);
        this.dispatch(getSubject(subjectCode));
        this.uiCtl.changeTitle(FORM_SHOW_TITLE,MODULE_ICON);
        this.uiCtl.loadContainer(Container,{subjectCode});


    }
    /** The modules reducers*/
    static reducers(){
        return {subjects:reducers};
    }

}
