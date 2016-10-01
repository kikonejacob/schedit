import Controller from 'lib/common/controller';
import React from 'react';
//Containers
import List from './containers/list';
import Form from './containers/form';
import ShowForm from './containers/show';

//external actions
import {initGridFromSchema} from 'lib/grid/actions.js';

//module json schemas
import * as FormSchema from './schemas/group.schema.json';
import * as ListSchema from './schemas/group.list.json';
import * as MembershipListSchema from './schemas/group.membership.list.json';
//module actions
import {getGroupInfo} from './lib/actions';

const FORM_TITLE='Student groups';
const FORM_SHOW_TITLE='Student groups';
const FORM_CREATE_TITLE='Create a new group';

const GRID_NAME='students.groups.grid';
const CONTROLLER_NAME='student.group.controller';
const MODULE_ICON='fa-group';


export default  class extends Controller {
    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema,FormSchema,MembershipListSchema};
    };
    /**
     * index display list of level fees
     * @param  {object[]} options  options for list display
     * @return void
     */
    index(options)
    {
        /** @type {integer} classId */
        const classId=options[0];
        this.dispatch(initGridFromSchema(this.schemas.ListSchema,{id:classId}));
        this.uiCtl.loadContainer(<List schema={this.schemas.ListSchema} uiCtl={this.uiCtl} />);
        this.uiCtl.changeTitle(this.schemas.ListSchema.title,MODULE_ICON);
    }
    indexMembership(options)
    {
        /** @type {string}  group */
        const group=options[0];
        this.dispatch(initGridFromSchema(this.schemas.MembershipListSchema,{code:group}));
        this.uiCtl.loadContainer(<List schema={this.schemas.ListSchema} uiCtl={this.uiCtl} />);
        this.uiCtl.changeTitle(this.schemas.ListSchema.title,MODULE_ICON);
    }
    /**
     * create  create a new level fee
     * @param  {object} options  passing levelId
     * @return {void}
     */
    create(){
        /** @type {string} group */
        const group='';
        /** @type {ReactElement}*/
        const Container=(<Form data={{studentId:-1}} uiCtl={this.uiCtl} dataId={group} />);
        this.uiCtl.loadContainer(Container,{group});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE,MODULE_ICON);
    }

    /**
     * Edit edit dialog for level fees
     * @param  {object} options Represent Url options
     * @return {void}         description
     */
    edit(options){
        const group=options[0];
        const Container=(<Form dataId={group}  uiCtl={this.uiCtl} />);
        this.dispatch(getGroupInfo(group));
        this.uiCtl.loadContainer(Container,{group});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE,MODULE_ICON);
    }

    show(options){
        const group=options[0];
        const MembershipListSchema=this.schemas.MembershipListSchema;
        this.dispatch(getGroupInfo(group));
        this.dispatch(initGridFromSchema(MembershipListSchema,{code:group}));
        this.uiCtl.changeTitle(FORM_SHOW_TITLE,MODULE_ICON);
        this.uiCtl.loadContainer(<ShowForm  group={group}
                     MembershipListSchema={MembershipListSchema} />,{group});
    }
}
