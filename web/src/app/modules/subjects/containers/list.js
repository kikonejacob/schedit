import GridView,{LinkComponent} from 'components/gridFormView/gridFormView';
import React from 'react';
import Header from 'components/ModuleHeaderView/ModuleHeaderView';
import Button from 'components/LinkComponent/LinkButtonView'



var columns=['code','name','type'];

var columnsMetaData=[{
	    'columnName': "name",
	    'order': 2,
	    'locked': false,
	    'visible': true,
	    'displayName': "Name",
	    'partialLink':'#subjects/',
	    'linkKey':'code',
	    'customComponent': LinkComponent
	  },
	  {
	    "columnName": "code",
	    "order": 1,
	    "locked": false,
	    "visible": true,
	    "displayName": "Code "
	  },
	  {
	    "columnName": "created",
	    "order": 4,
	    "locked": false,
	    "visible": true,
	    "displayName": "Created"
	  }

	];



export default class extends React.Component{



render(){


    let {title,description,onAction}=this.props;

    return(<div>

             <Header title= {title} description={description}>
                <Button link='#studylevels/create' action='new'>Add new level</Button>
                <Button link='#studylevels/delete' action='delete...'>Delete...</Button>
 
             </Header>
		     <GridView {...this.props} columns={columns} columnMetadata={columnsMetaData}  />
			</div>);

};

}