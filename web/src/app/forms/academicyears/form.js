import React from  "react"
import FormView from '../../components/FormView/form-view';


var schema = {
  "schema": {
    "name": {
      "title": 'Acadmic year name',
      "type": "Text",
      "fieldClass": "row"
    },
    "begin": {
      "title": 'begin',
      "type": "dateEx",
      "fieldClass": "row"
    },
    "end": {
      "title": 'End',
      "type": "dateEx",
      "fieldClass": "row"
  
    }
    
  }
};



export default React.createClass({


	render(){

		let data={
		
		}

		return(<div> <FormView schema={schema} data={data} onSave={this.props.save}  />  </div>)



	}
});

