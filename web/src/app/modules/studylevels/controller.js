import stringRes from 'utils/stringRes';
import List from './containers/list';
import Form from './containers/form';
import ShowForm from './containers/show';
import React from 'react';
import Controller from 'lib/common/controller';

import {levelGet,levelCreate,subjectsGet,feesGet,classesGet,levelSave,levelDelete} from './lib/actions.js';
import {initGridFromSchema} from 'lib/grid/actions.js';

import * as ListSchema from './schemas/studylevels.list.json';
import * as FormSchema from './schemas/form.studylevel.schema.json';



const FORM_SHOW_TITLE='Study Level';
const FORM_EDIT_TITLE='Study Level :: Edit';
const FORM_DELETE_TITLE='Study Level :: Delete';
const FORM_LIST_TITLE='Study Level :: list';
const FORM_CREATE_TITLE='Study Level :: Create';
const FORM_DELETE_HEADER='Select the levels you want to delete and click on delete';
const MODULE_ICON='fa-cogs';


const GRID_NAME='classes.grid';
const CONTROLLER_NAME='studylevel.controller';

export default  class extends Controller  {

    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema,FormSchema};
    };

    index(options)
    {

        this.dispatch(initGridFromSchema(this.schemas.ListSchema,{id:options[0]}));
        this.uiCtl.loadContainer(<List schema={this.schemas.ListSchema} uiCtl={this.uiCtl} />);
        this.uiCtl.changeTitle(this.schemas.ListSchema.title,MODULE_ICON);


    }
    create(){
        const levelId=-1;
        const Container=(<Form rawSchema={this.schemas.FormSchema} data={{levelId:-1}} uiCtl={this.uiCtl} dataId={levelId} />);
        this.uiCtl.loadContainer(Container,{levelId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE,MODULE_ICON);

    }

    show(options){

        const levelId=options[0];
        let Container= (<ShowForm />);
        this.dispatch(levelGet(levelId));
        //this.dispatch(subjectsGet(levelId));
        this.dispatch(feesGet(levelId));
        this.dispatch(classesGet(levelId));
        this.uiCtl.loadContainer(Container,{levelId});
        this.uiCtl.changeTitle(FORM_SHOW_TITLE,MODULE_ICON);
    }
    edit(options){

        const levelId=options[0];
        const Container=(<Form rawSchema={this.schemas.FormSchema}dataId={levelId} uiCtl={this.uiCtl} />);
        this.dispatch(levelGet(levelId));
        this.uiCtl.loadContainer(Container,{levelId});
        this.uiCtl.changeTitle(FORM_EDIT_TITLE,MODULE_ICON);
    }
    configure(){

    }


}
