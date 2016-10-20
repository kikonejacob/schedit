import React from 'react';
import ReactDom from 'react-dom';

class   APIErrorForm extends React.Component {

    handleReload(){
        window.location.reload();
    }

    render(){
        const {title,message}=this.props;
        return (<div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <div className="alert alert-danger">
                        <h2><i className="fa fa-exclamation-triangle"></i> Connection error: {title}</h2>
                        <p> Unable to communicate with the server</p>
                        <p> {message}</p>
                        <a className="btn btn-primary" href='#' onClick={this.handleReload}>Reload App</a>
                    </div>
                </div>
          </div>);
    }

};

export function showAPIerror(title,message){
    document.getElementById('apierror').style='';
    ReactDom.render(<APIErrorForm title={title} message={message} />,document.getElementById('apierror'));
}
export default APIErrorForm;
