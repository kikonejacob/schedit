/**
 * TODO obsolete component to be removed after correcting
 *  	the container in  modules/studyclasses/container/list
 */
import React from 'react';
import getLabelOfOption from 'utils/helper.js';


export default class Select extends React.Component{



render(){
    //let label=getLabelOfOption(this.props.metadata.options,this.props.data);
    return (<span>{this.props.data}</span>);

};

}
