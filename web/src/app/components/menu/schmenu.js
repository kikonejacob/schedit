import MenuNode from './sideMenu2.js';
import React,{PropTypes} from 'react' ;



class SchmenuBar extends React.Component {
    render() {
        return (<div className="navbar-default sidebar" role="navigation">
            	 <div className="sidebar-nav navbar-collapse">

            	 	 <MenuNode  node={this.props.node} mainNode={true} />

            	 </div>

			</div>);
    }
}

SchmenuBar.PropTypes={
    node:PropTypes.object,
    mainNode:PropTypes.bool
};
module.exports=SchmenuBar;
