import React, { Component } from'react';
import Subschema,{ Form, loader, ValueManager } from 'subschema';
import DateExInput from 'components/FormView/DateEx';
import debug from 'utils/debug';

loader.addType( 'dateEx', DateExInput );

//exportable form buttons designation constantes
export const btSaveCancel='bt_save_cancel';
export const btYesNoCancel='bt_yes_no_cancel';
export const btYesCancel='bt_yes_cancel';
export const btYesNo='bt_yes_no';


//default form  schema buttons constants
const SCbuttons={buttonsClass:'btn-toolbar',
    buttons:[{ label:'Save', action:'submit',className:'btn btn-primary pull-right'},
                                     { label:'Cancel',action:'cancel', className:'btn  pull-right'}
    ]
} ;
const YNCbuttons={buttonsClass:'btn-toolbar',
    buttons:[{ label:'Yes', action:'submit',className:'btn btn-primary pull-right'},
                                 { label:'No',action:'cancel', className:'btn  pull-right'},
                                 { label:'Cancel',action:'cancel', className:'btn  pull-right'}
    ]
} ;
const YCbuttons={buttonsClass:'btn-toolbar',
    buttons:[{ label:'Yes', action:'submit',className:'btn btn-primary pull-right'},
                                { label:'Cancel',action:'cancel', className:'btn  pull-right'}
    ]
} ;
const YNbuttons={buttonsClass:'btn-toolbar',
    buttons:[{ label:'Yes', action:'submit',className:'btn btn-primary pull-right'},
                                { label:'no',action:'cancel', className:'btn  pull-right'}
    ]
} ;



export default class FormView extends Component {


    constructor( props ) {
        super( props );
        this.state = {name: props.name};
    }
    componentWillMount() {
        this.valueManager = ValueManager( this.props.data);
        this._listeners = [
            this.valueManager.addListener('color', function (value) {
                console.log('color', value);
            }),
            this.valueManager.addListener(null, function (value) {
                // console.log( 'all', value);
            })
        ];
        this.valueManager.addSubmitListener(null, function (value) {
            console.log('add submit listener');
        });
    };
    /**very helpful for redux update*/
    componentWillReceiveProps( nextprops){

        this.valueManager.setValue(nextprops.data);
    }

    componentWillUnmount() {
        this._listeners.forEach((v)=>v.remove());
    };
    handleButtonClick(event, action){

        document.pressed=action;


    }
    handleSubmit(e,error,data){
           /* var vm=this.valueManager;
            e && e.preventDefault();*/

            /*console.log('submit was called', vm.getValue());
            alert('handle submit');
               */

            //this.props.onSave(vm.getValue());'
        let action=document.pressed;
        this.onSubmitForm(e,data,action);
    };


    /**
     * [render description]
     * @return {[type]} [description]
     * amoung the props will be {schema, save} props
     * YNCbuttons= yes no cancel buttons
     * SCbuttons=save cancel buttons
     */
    render() {

        let {schema,formButtons,onFormAction}=this.props;


      //  console.log(schema.fieldsets[schema.fieldsets.length-1]);

        if (schema.fieldsets)
        {
            switch(formButtons)
            {
            case btSaveCancel :
                schema.fieldsets[schema.fieldsets.length-1].buttons=SCbuttons;
                break;
            case btYesNoCancel:
                schema.fieldsets[schema.fieldsets.length-1].buttons=YNCbuttons;
                break;
            case btYesCancel:
                schema.fieldsets[schema.fieldsets.length-1].buttons=YCbuttons;
                break;
            case btYesNo:
                schema.fieldsets[schema.fieldsets.length-1].buttons=YNbuttons;
                break;

            };
        }


        return (<div className="col-lg-12">
                    <Form  {...this.props} onButtonClick={this.handleButtonClick}
                       onSubmit={this.handleSubmit} valueManager={this.valueManager}/>
                </div>);
    }

};
