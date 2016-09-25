import React,{Component} from 'react';


export default  class Link extends Component{

    handleClick(e){
        if(this.props.onLinkAction!=null){
            e.preventDefault();
            this.props.onLinkAction(e,this.props.action);
        }
    }

    render(){

        	let {link,children,action}=this.props;

        	return( <a className="btn btn-info" role="button" action={action} href={link} onClick={this.handleClick.bind(this)}>
        	 		   {children}
        	 		</a>);


    }
}
