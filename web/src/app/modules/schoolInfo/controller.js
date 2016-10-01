import stringRes from 'utils/stringRes';
import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import Form from './containers/form';

//module json schemas
import * as FormSchema from './schemas/schoolinfo.form.schema.json';

//module actions
import {GetSchoolInformation,SetSchoolInformation} from './lib/actions';



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
        this.schemas={FormSchema};
    };

    index(){
        this.dispatch(GetSchoolInformation());
        this.uiCtl.changeTitle(FORM_SHOW_TITLE,'fa-setting');
        this.uiCtl.loadContainer(<Form schema={this.schemas.FormSchema} onSubmitForm={SetSchoolInformation} />);
    }


}
