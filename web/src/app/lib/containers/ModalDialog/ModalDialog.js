import React,{Component} from 'react';
import Button from 'components/LinkComponent/LinkButtonView';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

class ModalContainer extends Component {
    render(){
        return(<Modal></Modal>);
    }
}
