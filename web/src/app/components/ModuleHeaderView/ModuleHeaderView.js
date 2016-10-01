import React,{Component} from 'react';


export default  class ModuleHeaderView extends Component{


    render(){
        let title=this.props.title?this.props.title:'';
        return (
             <nav className="navbar-component navbar" role="navigation">
              <div className='container-fluid'>
                  <h2>{title}</h2>
                  <h5> {this.props.description} </h5>
                  <div className='btn-toolbar'>
                    {this.props.children}
                  </div>
              </div>
            </nav>

          );
    }




}
