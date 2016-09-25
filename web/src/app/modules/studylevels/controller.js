import debug from 'utils/debug.js';
import stringRes from 'utils/stringRes';
import List from './containers/list';
import Form from './containers/form';
import ShowForm from './containers/show';
import React from 'react';
import Controller from 'lib/common/controller';

import {levelGet,levelCreate,subjectsGet,feesGet,classesGet,levelSave,levelDelete} from './lib/actions.js';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';
import {listLevelClasses} from 'modules/studyclasses/lib/actions';
import {listLevelFees} from 'modules/levelfees/lib/actions';
import {listLevelSubjects} from 'modules/levelfees/lib/actions';
import {initGridFromSchema} from 'lib/grid/actions.js';

import * as ListSchema from './schemas/studylevels.list.json';
import * as FormSchema from './schemas/form.studylevel.schema.json';



const FORM_SHOW_TITLE='Study Level';
const FORM_EDIT_TITLE='Study Level :: Edit';
const FORM_DELETE_TITLE='Study Level :: Delete';
const FORM_LIST_TITLE='Study Level :: list';
const FORM_CREATE_TITLE='Study Level :: Create';
const FORM_DELETE_HEADER='Select the levels you want to delete and click on delete';


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
        this.uiCtl.changeTitle(this.schemas.ListSchema.title);


    }
    create(){
        const levelId=-1;
        const Container=(<Form rawSchema={this.schemas.FormSchema} data={{levelId:-1}} uiCtl={this.uiCtl} dataId={levelId} />);
        this.uiCtl.loadContainer(Container,{levelId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE);

    }

    show(options){

        const levelId=options[0];
        let Container= (<ShowForm />);
        this.dispatch(levelGet(levelId));
        //this.dispatch(subjectsGet(levelId));
        this.dispatch(feesGet(levelId));
        this.dispatch(classesGet(levelId));
        this.uiCtl.loadContainer(Container,{levelId});
        this.uiCtl.changeTitle(FORM_SHOW_TITLE);
    }
    edit(options){

        const levelId=options[0];
        const Container=(<Form rawSchema={this.schemas.FormSchema}dataId={levelId} uiCtl={this.uiCtl} />);
        this.dispatch(levelGet(levelId));
        this.uiCtl.loadContainer(Container,{levelId});
        this.uiCtl.changeTitle(FORM_EDIT_TITLE);
    }
    configure(){

    }


}
