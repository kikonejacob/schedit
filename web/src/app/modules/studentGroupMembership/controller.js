/**
 *
 * @version: 1.0
 * @description: This module is controller student membership
 */
import React from 'react';
import Controller from 'lib/common/controller';
//Containers
import List from './containers/list';
//external actions
import {initGridFromSchema} from 'lib/grid/actions.js';
//module json schemas
import * as ListSchema from './schemas/student.membership.list.json';

const GRID_NAME='students.membership.grid';
const CONTROLLER_NAME='students.membership.controller';

export default  class extends Controller {
    /**
     * Create the controller object
     * @param  {object} options -The options of the classe
     * @param  {string} [options.controllerName=CONTROLLER_NAME] - The controller name
     * @param  {string} [options.gridName=GRID_NAME] - The grid name
     * @return {void}
     */
    constructor(options){
        super(options);
        this.title = options.controllerName||CONTROLLER_NAME;
        this.gridName=options.gridName||GRID_NAME;
        this.schemas={ListSchema};
    };
    /**
     * Display a list of students group
     * @param  {object[]} options -The options of the classe
     * @param  {string} [options[0]] - The student id
     * @return {void}
     */
    index(options)
    {
        this.dispatch(initGridFromSchema(this.schemas.ListSchema,{id:options[0]}));
        this.uiCtl.loadContainer(<List schema={this.schemas.ListSchema} uiCtl={this.uiCtl} />);
        this.uiCtl.changeTitle(this.schemas.ListSchema.title);
    }


}
