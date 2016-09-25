import stringRes from 'utils/stringRes';
import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import List from './containers/list';
import Form from './containers/form';
import ShowForm from './containers/showForm';

//external actions
import {listStudentTuition} from 'modules/studentTuition/lib/actions';
import {listStudentEnrollments} from 'modules/studentEnroll/lib/actions';
import {initGridFromSchema} from 'lib/grid/actions.js';

//module json schemas
import * as FormSchema from './schemas/aid.schema.json';
import * as ListSchema from './schemas/aids.list.schema.json';

//module actions
import {getReduction} from './lib/actions';



const FORM_TITLE='Student';
const FORM_SHOW_TITLE='Student';
const FORM_CREATE_TITLE='Register a new student';

const GRID_NAME='studentAids.grid';
const CONTROLLER_NAME='studentAids';


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
        this.dispatch(initGridFromSchema(this.schemas.ListSchema,{id:options[0]}));
        this.uiCtl.loadContainer(<List schema={this.schemas.ListSchema} uiCtl={this.uiCtl} />);
        this.uiCtl.changeTitle(this.schemas.ListSchema.title);
    }

    /**
     * create  create a new level fee
     * @param  {object} options  passing levelId
     * @return {void}
     */
    create(){
        const studentId=-1;
        const Container=(<Form data={{studentId:-1}} uiCtl={this.uiCtl} dataId={studentId} />);
        this.uiCtl.loadContainer(Container,{studentId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE);
    }

    /**
     * Edit edit dialog for level fees
     * @param  {object} options Represent Url options
     * @return {void}         description
     */
    edit(options){
        const studentId=options[0];
        const Container=(<Form dataId={studentId} uiCtl={this.uiCtl} />);
        this.dispatch(getStudent(studentId));
        this.uiCtl.loadContainer(Container,{studentId});
        this.uiCtl.changeTitle(FORM_CREATE_TITLE);
    }

    show(options,props){
        const studentId=options[0];
        this.dispatch(getStudent(studentId));
        this.dispatch(listStudentTuition(studentId,'student.tuition'));
        this.dispatch(listStudentEnrollments(studentId,'student.enrollments'));
        //this.dispatch(subjectsGet(levelId));
        this.uiCtl.changeTitle(FORM_SHOW_TITLE);
        this.uiCtl.loadContainer(<ShowForm schema={this.schemas.ShowSchema}
                                          uiCtl={this.uiCtl}
                                          {...props} />,{studentId});
    }
}
