import React,{PropTypes} from 'react';

export const DEFAULT_BUTTONS=[
    {caption:'OK',action:'submit'},
    {caption:'Cancel',action:'cancel'}
];

export default  class DialogButtonsGroup extends React.Component{
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
                {buttons.map((data)=>{
                    const className=(data.default)? 'btn active' : 'btn';
                    return (<button
                             className={className}
                             onClick={this.handleActions.bind(this)}
                             type={data.action}
                             key={`button.${i++}`}
                            >
                              {data.caption}
                            </button>);
                })}
             </div>);
        }
        else {
            return (<div className='btn-toolbar pull-right'></div> );
        }
    }
};

DialogButtonsGroup.prototypes={
    buttons:PropTypes.object.isRequired

};
