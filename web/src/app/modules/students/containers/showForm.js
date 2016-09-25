import React,{Component,PropTypes} from 'react';
import Panel from 'components/panel/panel';
import List from 'components/list/List';
import InlineList from 'components/InlineList/InlineList';
import { connect } from 'react-redux';
import ProgressDialog from 'components/ProgressDialog/progressDialog';
import {URL_STUDENT,URL_STUDENTS} from 'lib/apiUrlconst';
import Form from "react-jsonschema-form";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import * as _ from 'lodash';




// Define a custom component for handling the root position object
class InlineListWrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {formData,schema,uiSchema} = this.props;
        const {studentId,urlTemplate,ItemUrl,captionField}=uiSchema.options;
        const linkUrl=ItemUrl ? ItemUrl.replace(':id',studentId) : '';

        console.log(schema);

        return (
          <div>
            <fieldset>
              <legend><a href={urlTemplate.replace(':id',studentId)} > {schema.title}</a></legend>
              <div>
                <InlineList data={formData} captionField={captionField}
                                keyField='id' linkUrl={linkUrl} />
              </div>
            </fieldset>
          </div>
        );
    }
}

class Caption extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props);
    }
    render() {
        const {formData,schema,idSchema} = this.props;
        return (
          <span id={idSchema.$id} >
            &#8200; {formData}
          </span>
        );
    }
}

const DefaultUiSchema={
    "ui:readonly": true

};

// Define the custom field components to register; here our "geo"
// custom field component
const fields = {"InlineList": InlineListWrapper,
               };

class ShowForm extends Component{

    constructor(){
        super();
    }

    render(){
        var formData={
            data:this.props.data,
            enrollments:this.props.enrollments.items,
            tuition:this.props.tuition.items
        };
        const {schema,uiSchema}=this.props;
        const options={options:{studentId:formData.data.id}};
        console.log(formData);
        return (
            <div className="col-lg-12">
                <Form schema={schema.schema} uiSchema={_.merge(DefaultUiSchema,schema.uiSchema,{enrollments:options})}
                  fields={fields} formData={formData} registry={this.registry}>
                  <div></div>
               </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { students,collections,activeContainer } = state;
    const studentId=activeContainer.studentId;
    const {isFetching,lastUpdated,data} = students[studentId] || {
        isFetching: false,
        data:{},
    };
    const tuition=collections['student.tuition'];
    console.log(tuition);
    const enrollments=collections['student.enrollments'];

    return {
        data,
        tuition,
        enrollments,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(ShowForm);
