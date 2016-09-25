import React,{Component} from 'react';


export default  class Link  extends Component{

render(){

    let {link,OnClick,children}=this.props;
    return( <a href={link} OnClick={OnClick}>{children}</a>)


	}
}
