import React from 'react';


export default class Panel  extends React.Component{


    render(){
        let {title, refLink, icon} = this.props;
        let refTitle = (refLink == undefined) ?
                     (<span> {title} </span>) :
                      (<span><a href={refLink}>{' '+title}</a></span>);
        let refIcon = (icon == undefined) ? ' ' : (<i className={icon}>{' '}</i>);
        return (
            <div>

                <div className="panel panel-default">
                    <div className="panel-heading">{refIcon}{refTitle}</div>
                    <div className="panel-body">
                        <div>
                            {this.props.children}
                        </div>

                    </div>
                </div>
            </div>

        );
    }

}
