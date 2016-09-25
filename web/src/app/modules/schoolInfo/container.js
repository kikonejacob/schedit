import  FormView from 'components/FormView/form-view';
import SchoolInfoTitleView from 'components/TitleView/SchoolInfoTitleView'
import  React,{Component} from 'react';
var errors = {};

var data={};
var schema = {

    'name': {
        'title': 'Name',
         'type': 'Text',
      'fieldClass': 'row',
    },
    "email": {
      "title": 'E-mail',
      "type": 'Text',
      "fieldClass": 'row',
    },
    "country": {
      "title": 'Country',
      "type": 'Text',
      "fieldClass": "row",
    },
    "state": {
      "title": 'State/Province',
      "type": "Text",
      "fieldClass": "row",
    },
    "main_phone": {
      "title": 'Main Phone',
      "type": "Text",
      "fieldClass": "row",
    },
    "secondary_phone": {
      "title": 'Main Phone',
      "type": "Text",
      "fieldClass": "row",
    },
    "website": {
      "title": 'website',
      "type": "Text",
      "fieldClass": "row",
    },
    "logo_fileID":{
      "title":"",
      "type":"Hidden"
    }
 
};




export default class SchooInfo extends Component{ 


  
  render(){
      return ( <div>
               <div> <SchoolInfoTitleView {...this.props} /> </div>
               <div> <FormView schema={schema} data={this.props.data} onSave={this.props.save}  />  </div>
            </div>)
  }




}