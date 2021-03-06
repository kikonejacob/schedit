import React from 'react';
import Controller from 'lib/common/controller';

//Containers
import List from './containers/list';

//external actions
import {initGridFromSchema} from 'lib/grid/actions.js';

//module json schemas
import * as ListSchema from './schemas/enrollments.list.schema.json';




const FORM_TITLE='Classe';
const FORM_SHOW_TITLE='Classe';
const FORM_CREATE_TITLE='Create a new class';

const GRID_NAME='classes.grid';
const CONTROLLER_NAME='classe.controller';


export default  class extends Controller {
    constructor(options){
        super(options);
        this.name = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema};
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
        this.uiCtl.changeTitle(this.schemas.ListSchema.title);
    }



}
