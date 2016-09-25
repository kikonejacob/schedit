import React, { Component,PropTypes } from'react';
import Form from 'react-jsonschema-form';
import log from 'utils/debug';

//exportable form buttons designation constantes
export const btSaveCancel='bt_save_cancel';
export const btYesNoCancel='bt_yes_no_cancel';
export const btYesCancel='bt_yes_cancel';
export const btYesNo='bt_yes_no';

export default class FormView extends Component {

    constructor( props ) {
        super( props );
    }
    componentWillMount(){


    }
    handleCancel(event){
        event.preventDefault();
        return (this.props.onAction)?this.props.onAction('cancel',{}):null;
    }
    handleSubmit(state){
        return (this.props.onAction)?this.props.onAction('submit',state.FormData):null;

    }
    getButtons(){
        switch(this.props.buttons){
        case btSaveCancel:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primaryt">Save</button>
                        <button type="cancel" className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>);
        case btYesCancel:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary">Yes</button>
                        <button type="cancel" className="btn btn" onClick={this.handleCancel.bind(this)} >Cancel</button>
                </div>);
        case btYesNoCancel:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary">Yes</button>
                        <button type="cancel" className="btn" onClick={this.handleCancel.bind(this)}>No</button>
                        <button type="cancel" className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>);
        default:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary" >Save</button>

                        <button className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>);
        }
    }
    render(){
        const {UISchema,data,schema}=this.props;
        return (
          <div className="col-lg-12">
              <Form schema={schema} uiSchema={UISchema}
                formData={data}
                onSubmit={this.handleSubmit.bind(this)}
              >
                {this.getButtons()}
              </Form>
          </div>
      );
    }
}

FormView.propTypes={
    data: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    onSubmitForm:PropTypes.func,
};
