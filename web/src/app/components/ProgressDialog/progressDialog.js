/**
 * css imported from  http://tobiasahlin.com/spinkit/
 */

import React,{Component} from 'react';


export default class ProgressDialog extends Component{

    render(){

        return (<div>
                  <div className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                      <div className="bounce4"></div>
                    </div>
                </div>);
    }
}
