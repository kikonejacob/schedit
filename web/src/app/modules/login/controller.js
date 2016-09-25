import stringRes from 'utils/stringRes';
import LoginForm from './containers/login.dialog';

import React from 'react';

import { Provider } from 'react-redux';
import {updateActiveContainer,loadContainer,changeTitle} from 'lib/common/actions';
import Controller from 'lib/common/controller';

//Module form titles
const FORM_TITLE='Login';


export default  class extends Controller  {
    constructor(options){
        super(options);
        console.log('login controller..');
        this.title = stringRes.studentBasic;
        this.registry=options.store;
        this.reducers=null;
        this.current = null;
    };

    index(){
        this.current=null;
        this.uiCtl.loadContainer(  <LoginForm uiCtrl={this.uiCtl} />);
        this.uiCtl.changeTitle(FORM_TITLE);
    }
}
