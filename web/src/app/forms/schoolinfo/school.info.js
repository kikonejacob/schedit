import React from  "react"
import FormView from '../../components/FormView/form-view';


var schema = {
  "schema": {
    "name": {
      "title": 'School name',
      "type": "Text",
      "fieldClass": "row"
    },
    "country": {
      "title": 'country',
      "type": "Text",
      "fieldClass": "row"
    },
    "city": {
      "title": 'City',
      "type": "Text",
      "fieldClass": "row"
  
    },
    "zipcode": {
      "title": 'zipcode',
      "type": "Text",
      "fieldClass": "row"
    },
    "address1": {
      "title": 'Adress 1',
      "type": "Text",
      "fieldClass": "row",
    },
    "address2": {
      "title": 'Adress 2',
      "type": "Text",
      "fieldClass": "row",
    },

    "email": {
      "title": 'Email',
      "type": "Text",
      "fieldClass": "row",
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
