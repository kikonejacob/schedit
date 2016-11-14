import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import Form from './containers/form';
import SchoolPictureForm from './containers/uploadIcon';

//module json schemas
import * as FormSchema from './schemas/schoolinfo.form.schema.json';

//module actions
import {getSchoolInformation,setSchoolInformation} from './lib/actions';
import {FORM_TITLE,GRID_NAME, CONTROLLER_NAME,MODULE_ICON,MODULE_REGISTERED_NAME,MODULE_API_REDUCER} from './lib/consts';
import {reducers} from './lib/reducers';

const DEFAULT_SCHOOL_INFORMATION_ID='sch';


export default  class extends Controller {
    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={FormSchema};
        this.registeredName=MODULE_REGISTERED_NAME;
    };

    /**
     * Edit edit dialog for level fees
     * @param  {Array} options Represent Url options
     * @return {void}         description
     */
    index(){
        const Container=(<Form schema={this.schemas.FormSchema}
                               datasource={MODULE_API_REDUCER}
                               dataId={DEFAULT_SCHOOL_INFORMATION_ID} uiCtl={this.uiCtl}
                               onSubmitForm={setSchoolInformation}
                         />);
        this.dispatch(getSchoolInformation());
        this.uiCtl.loadContainer(Container,{DEFAULT_SCHOOL_INFORMATION_ID});
        this.uiCtl.changeTitle(FORM_TITLE,MODULE_ICON);

    }

    changePicture(){
        const Container=(<SchoolPictureForm schema={this.schemas.FormSchema}
                               datasource={MODULE_API_REDUCER}
                               dataId={DEFAULT_SCHOOL_INFORMATION_ID} uiCtl={this.uiCtl}
                               onSubmitForm={setSchoolInformation}
                         />);
        this.dispatch(getSchoolInformation());
        this.uiCtl.loadContainer(Container,{DEFAULT_SCHOOL_INFORMATION_ID});
        this.uiCtl.changeTitle(FORM_TITLE,MODULE_ICON);
    }

    /** The modules reducers*/
    static reducers(){
        return reducers;
    }

}
