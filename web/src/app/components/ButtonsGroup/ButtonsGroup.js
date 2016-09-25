import React,{PropTypes} from 'react';
import Button from 'components/LinkComponent/LinkButtonView';

export const DEFAULT_BUTTONS=[
    {caption:'OK',action:'submit'},
    {caption:'Cancel',action:'cancel'}
];

export default  class ButtonsGroup extends React.Component{
    handleActions(e,action){

        if (this.props.onAction){
            return this.props.onAction(action);
        }
    }
    render(){
        const {buttons}=this.props;
        if (buttons){
            let i=0;
            return (<div className='btn-toolbar pull-right'>
                {buttons.map((button)=>{
                    return (<Button link='#'
                             onLinkAction={this.handleActions.bind(this)}
                             action={button.action}
                             key={`button.${i++}`}
                            >
                              {button.caption}
                            </Button>);
                })}
             </div>);
        }
        else {
            return (<div className='btn-toolbar pull-right'></div> );
        }
    }
};

ButtonsGroup.prototypes={
    buttons:PropTypes.object.isRequired

};
