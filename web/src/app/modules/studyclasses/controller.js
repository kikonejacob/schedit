import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import List from './containers/list';
import Form from './containers/form';
import ShowForm from './containers/show';

//external actions
import {initGridFromSchema} from 'lib/grid/actions.js';
import {listLevelSubjects} from 'modules/levelsubjects/lib/actions';
import {listLevelFees} from 'modules/levelfees/lib/actions';
import {listBranches} from 'modules/studyBranches/lib/actions';
import {levelGet,listLevels} from 'modules/studylevels/lib/actions';

//module json schemas
import * as FormSchema from './schemas/form.class.json';
import * as ListSchema from './schemas/classes.list.json';

//module actions
import {getStudyClass,getClassAggregate} from './lib/actions';



const FORM_TITLE='Classe';
const FORM_SHOW_TITLE='Classe';
const FORM_CREATE_TITLE='Create a new class';

const GRID_NAME='classes.grid';
const CONTROLLER_NAME='classe.controller';
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
     * create  create a new level fee
     * @param  {object} options  passing levelId
     * @return {void}
     */
    create(){
        const classId=-1;
        const Container=(<Form rawSchema={this.schemas.FormSchema} data={{classId:-1}} uiCtl={this.uiCtl} dataId={classId} />);
        this.dispatch(listBranches()),
        this.dispatch(listLevels());
        this.uiCtl.loadContainer(Container,{classId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE,MODULE_ICON);
    }

    /**
     * Edit edit dialog for level fees
     * @param  {object} options Represent Url options
     * @return {void}         description
     */
    edit(options){
        console.log('edit controller');
        const classId=options[0];
        this.dispatch(listBranches()),
        this.dispatch(listLevels());
        const Container=(<Form rawSchema={this.schemas.FormSchema} dataId={classId} uiCtl={this.uiCtl} />);
        this.dispatch(getStudyClass(classId));
        this.uiCtl.loadContainer(Container,{classId});
        this.uiCtl.changeTitle(FORM_TITLE,MODULE_ICON);

    }

    show(options,props){
        const classId=options[0];
        let Container= (<ShowForm {...props}/>);
        /* In this cas we want to get study class informations and wait for the async api
          call to be processed by the reducer before we continue */
        Promise.all([
            this.dispatch(getStudyClass(classId)),
            this.dispatch(getClassAggregate(classId))
        ]).then(()=>{
            let levelId=this.registry.getState().classes[classId].data.levelId;
            //this.dispatch(levelGet(levelId));
            //this.dispatch(subjectsGet(levelId));
            this.dispatch(listLevelFees(levelId));
            this.uiCtl.changeTitle(FORM_SHOW_TITLE,MODULE_ICON);
            this.uiCtl.loadContainer(Container,{classId,levelId});

        });
    }
}
