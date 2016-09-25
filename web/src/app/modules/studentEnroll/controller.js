import ListContainer from 'lib/common/macros/listContainer';
//import DeleteList from './containers/delete';
import Form from './containers/form';
import ShowForm from './containers/show';
import React from 'react';

import { Provider } from 'react-redux';
import {getStudent,enroll,getEnrollmentInfo,CancelEnrollment,initStudentGrid} from './lib/actions.js';
import {refreshGridOptions,initGridFromSchema} from 'lib/grid/actions.js';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';
import {listStudentTuition} from 'modules/studentTuition/lib/actions';
import {listStudentEnrollments} from 'modules/studentEnroll/lib/actions';
import {initStudentEnrollmentsGrid}from './lib/actions';

import {controllerCtl} from 'utils/controllerHelper';
import * as listSchema from './schemas/enrollments.list.json';
import * as classSchema from 'modules/studyclasses/schemas/classes.list.json';
import Controller from 'lib/common/controller';
import EnrollForm from './containers/enroll';
import EnrollClassSearch from './containers/searchClasses';
import List from './containers/list';

//Module form titles
const FORM_TITLE='Student enrollements';
const FORM_SHOW_TITLE='Student';
const FORM_CREATE_TITLE='Register a new student';


const DELETE_CONFIRM='Are you sure you want to delete these items ?';
const STUDY_CLASS_CONTROLLER='studyclasses';

const GRID_NAME='student.enrollments.grid';
const CONTROLLER_NAME='student.enrollments.controller';


export default  class  extends Controller {
    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.schemas={listSchema,classSchema};
    };
    /**
     * Index display list of student enrollments
     * @param  {object} options [receive levelId]
     * @return {[void]}         []
     */
    index(options)
    {
        const studentId=options[0];
        this.dispatch(initGridFromSchema(listSchema,{id:studentId}));
        this.uiCtl.loadContainer(<List schema={this.schemas.listSchema} uiCtl={this.uiCtl} dataId={studentId} />);
        /*let Container=ListContainer(this.registry,listSchema,
                                        this.handleIndexActions.bind(this));*/
        this.uiCtl.changeTitle(this.schemas.listSchema.title);
    }
    UIEnrollSearch(Container,params){

    }
    /**
     * Allows user to search for classes to enroll.
     * @param {[type]} options [description]
     */
    EnrollSearch(options){
        const studentId=options[0];
        var classController=controllerCtl(STUDY_CLASS_CONTROLLER,{store:this.registry});
        const classListschema={...classController.schemas.ListSchema,
                                buttons:[],
                                target:'#students/:id/enroll/',
                                title:'Enroll to a class',
                                mode:'advancedSearch'
        };
        this.dispatch(initGridFromSchema(classListschema,{id:studentId}));
        let Container=<EnrollClassSearch schema={classListschema} uiCtl={this.uiCtl} dataId={studentId} />;
        this.uiCtl.loadContainer(Container);
        this.uiCtl.changeTitle(classListschema.title);

    }
    UIenrollCheckLoader(Container,params){
        const {containerInfo,classId,studentId}=params;
        this.uiCtl.loadContainer((<EnrollForm classId={classId} studentId={studentId} uiCtl={this.uiCtl}>
                                    {Container}

                                </EnrollForm>),
                                containerInfo
                            );
    }
    enrollCheck(options){
        const studentId=options[0];
        const classId=options[1];
        var classController=controllerCtl(STUDY_CLASS_CONTROLLER,{store:this.registry});
        classController.uiCtl.setCustomContainerLoader(this.UIenrollCheckLoader.bind(this),{studentId,classId});
        classController.show([classId],{buttons:[],
                                    onAction:this.handleEnrollCheckActions});

    }
    /**
     * custom loader for Enrollment Informations
     * Load the imported module controller result in the current controller
     * @param {React.Component} Container Component to be loaded
     * @param {object} params   paramaters
     */
    UIEnrollInfoLoader(Container,params){
        this.uiCtl.loadContainer((<ShowForm dataId={params.enrollId}>
                                    {Container}
                                </ShowForm>),
                                params.containerInfo
                            );
    }
    /**
     * Show description of the class enrolled and the
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    show(options){
        const studentId=options[0];
        const enrollId=options[1];
        var classController=controllerCtl(STUDY_CLASS_CONTROLLER,{store:this.registry});
        classController.uiCtl.setCustomContainerLoader(this.UIEnrollInfoLoader.bind(this),{enrollId});
        Promise.all([
            this.dispatch(getEnrollmentInfo(studentId,enrollId))
        ]).then(()=>{
            const classId=this.registry.getState().studentEnrollments[enrollId].data.classId;
            classController.show([classId],{buttons:[]});
        });


    }


}
