import React,{Component,PropTypes} from 'react';


//exportable form buttons designation constantes
export const btSaveCancel='bt_save_cancel';
export const btYesNoCancel='bt_yes_no_cancel';
export const btYesCancel='bt_yes_cancel';
export const btYesNo='bt_yes_no';
export const btOK='bt_OK';


export default class DialogButtons extends Component{

    handleCancel(){

    }
    handleActions(){

    }

    render(){
        const model=this.props.model||btSaveCancel;
        switch(model){
        case btSaveCancel:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primaryt">Save</button>
                        <button type="cancel" className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>);
            break;
        case btYesCancel:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary">Yes</button>
                        <button type="cancel" className="btn btn" onClick={this.handleCancel.bind(this)} >Cancel</button>
                </div>);
            break;
        case btYesNoCancel:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary">Yes</button>
                            <button type="cancel" className="btn" onClick={this.handleCancel.bind(this)}>No</button>
                            <button type="cancel" className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                        </div>);
            break;
        case btOK:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary">OK</button>
                    </div>);
            break;

        default:
            return (<div className='btn-toolbar  pull-right'>
                        <button type="submit" className="btn btn-primary" >Save</button>

                        <button className="btn" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>);
            break;
        }
    }
}
