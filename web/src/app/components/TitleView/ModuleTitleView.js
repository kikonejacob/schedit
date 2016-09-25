import React from 'react';

class TitleView extends React.Component  {
	
 render(){

 	return(
 		<div className="col-lg-12">
              <h1 className="page-header">{this.props.title}</h1>
        </div>

 		)

 
 }

}

var ModuleTitleView=TitleView;


module.exports=ModuleTitleView;