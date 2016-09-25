import React from 'react';
import Subschema,{ Form, loader, ValueManager } from 'subschema';
import { Provider } from 'react-redux';


export default class extends React.Component{

    handleSubmit(e,error,data){
        e.preventDefault() ;
        let action=this.pressed;
        if (action=='cancel') action='CancelAdvancedSearch';
        if (action=='submit') action='runAdvancedSearch';
        this.props.onAction(action,data);
    };
    handleButtonClick(event, action){
        this.pressed=action;
    }

    render(){
        const buttons=[
                    { label:'Search',
                       action:'submit',
                       className:'btn btn-primary pull-right'
                   },
                   { label:'Cancel',
                                   action:'cancel',
                                   className:'btn  pull-right'
                               }];

        const {schema,onAction}=this.props;
        var nSchema=schema;
        nSchema.fieldsets=[{fields:Object.keys(schema.schema),
                            legend:"Advanced search",
                            buttons:{buttons,
                                   buttonsClass:'btn-toolbar'
                               }
                        }];

        return (<Form schema={nSchema}
                        value={{}}
                        onButtonClick={this.handleButtonClick.bind(this)}
                        onSubmit={this.handleSubmit.bind(this)} />);
    }

}
