import React,{Component} from 'react';


export default  class ModuleHeaderView extends Component{


    render(){
        let title=this.props.title?(<h2> {this.props.title}</h2>):'';
        return (
        		 <nav className="navbar-component navbar" role="navigation">
        			<div className='container-fluid'>
          				{title}
          				<h5> {this.props.description} </h5>
          				<div className='btn-toolbar'>
          					{this.props.children}
          				</div>
        			</div>
        		</nav>

          );
    }




}
