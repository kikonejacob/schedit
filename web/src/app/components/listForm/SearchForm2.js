import React from 'react';
import Form from 'react-jsonschema-form';
import DialogButtonGroup from '../ButtonsGroup/DialogButtonsGroup';


const SEARCH_BUTTONS=[
    {caption:'Search',action:'submit',default:true},
    {caption:'Cancel',action:'cancel'}
];

export default class extends React.Component{

    handleSubmit(formData){
        console.log('fdfd');
        //e.preventDefault() ;
        let action=this.pressed;
        if (action=='cancel') action='CancelAdvancedSearch';
        if (action=='submit') action='runAdvancedSearch';
        this.props.onAction(action,formData);
    };
    handleButtonClick(event, action){
        this.pressed=action;
    }
    render() {
        const buttons = [
            {
                label: 'Search',
                action: 'submit',
                className: 'btn btn-primary pull-right'
            },
            {
                label: 'Cancel',
                action: 'cancel',
                className: 'btn  pull-right'
            }];

        const {schema, onAction} = this.props;
        console.log(schema);
        let nSchema = schema.schema;
        nSchema.fieldsets = [{
            fields: Object.keys(schema.schema),
            legend: 'Advanced search',
            buttons: {
                buttons,
                buttonsClass: 'btn-toolbar'
            }
        }];

        return (<Form schema={nSchema}
                    value={{}}
                    onButtonClick={this.handleButtonClick.bind(this) }
                    onSubmit={this.handleSubmit.bind(this) }>
                    <DialogButtonGroup buttons={SEARCH_BUTTONS} onAction={this.handleButtonClick.bind(this)}  />
              </Form>);
    }

}
