import stringRes from 'utils/stringRes';
import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import List from './containers/list';
//external actions
import {listStudentTuition} from 'modules/studentTuition/lib/actions';
import {listStudentEnrollments} from 'modules/studentEnroll/lib/actions';
import {initGridFromSchema} from 'lib/grid/actions.js';

//module json schemas
import * as ShowSchema from './schemas/student.show.schema.json';
import * as ListSchema from './schemas/student.list.schema.json';





const FORM_TITLE='Student';
const FORM_SHOW_TITLE='Student';
const FORM_CREATE_TITLE='Register a new student';

const GRID_NAME='students.grid';
const CONTROLLER_NAME=stringRes.studentBasic;


export default  class extends Controller {
    constructor(options){
        super(options);
        this.title = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema,ShowSchema};
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
        this.uiCtl.changeTitle('delph')
    }


}
