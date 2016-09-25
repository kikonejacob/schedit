import React,{Component}  from 'react';
import   FormView,{btYesNoCancel,btSaveCancel} from 'components/FormView/form-view';

var schema = {
  "schema": {
    "name": {
      "title": 'Name',
      "type": "Text",
      "fieldClass": "row",
      "disabled":'true'
    },
    'code': {
      'title': 'Code',
      'type': "Text",
      'fieldClass': "row",
      'disabled':'true'
    },
    'type': {
      "title": 'Type',
      "type": 'Select',
      "fieldClass": "row",
      "disabled":'true'
    }
    
  },
  'fieldsets':[{
       'fields':['name','code','type']
       

  }]
};


export default class Form extends Component{



render(){

   

    return(<div> <FormView formButtons={btSaveCancel} schema={schema}  {...this.props} />  </div>);



}



}
