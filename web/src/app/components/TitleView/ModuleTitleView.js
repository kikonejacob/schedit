import React from 'react';

export default class TitleView extends React.Component  {

    render(){

        let icon='';
        // We can apply icon as fontawsome or image with href
        if (this.props.icon){
            if (String(this.props.icon).match(/fa-\w*/i)){
                icon=(<i className={'fa fa-fw '+this.props.icon} aria-hidden="true"> </i>);
            }
            else{
                icon=(<im alt='Module Icon' src={this.icon} />);
            }
        }

        return(
            <div className="col-lg-12">
                <h1 className="page-header">{icon}<span>{this.props.title}</span></h1>
            </div>
         );

    }

}
