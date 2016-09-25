import BootstrapModal from "../components/Modal/bootstrapModal";
import React from "react";
import Radio from "backbone.radio";


class DialogPortal {


	constructor(containerId){

		this.nodes=[];
		this.dialogs=[];
		this.titles=[];
		this.container=document.getElementById(containerId);
		this.containerId=containerId;
		this.count=0;
		this.channel=Radio.channel('services');

	}

	configureChannel(){

		this.channel.on('showModal',showModalEx);
	}

	addDialog(form,title){

		var dialogElement=document.createElement('div');
		dialogElement.id=this.containerId+'_dialog_container_'+this.count;

		var node=this.container.appendChild(dialogElement);

		this.nodes.push(node);

		this.dialogs.push(form);
		this.titles.push(title);
		
		this.count++;
		return this.count-1;
		

	}

	handleClose(refId){

		this.deleteDialog(refId);


	}
	showModal(refId){
		var Dialog=this.dialogs[refId];
		var node=this.nodes[refId];
		var Modal=(<BootstrapModal title={this.titles[refId]} DId={refId} closePortal={this.handleClose.bind(this)}> {Dialog} </BootstrapModal>)

        React.render(Modal ,node);

	}
	showModalEx(form,title){
		var refId=this.addDialog(form,title);
		showModal(refId);

	}
	deleteDialog(refId){

		var Dialog=this.dialogs[refId];
		var node=this.nodes[refId];
		React.unmountComponentAtNode(node);
		this.container.removeChild(node);
		this.dialogs.splice(refId,1);
		this.nodes.splice(refId,1);
		this.titles.splice(refId,1)
	

	}

		



	
}


export default function modal(){

	var portal=new DialogPortal('modal_container');
	var MyTest=(<div> I'm in love </div>);
	portal.addDialog(MyTest,"The true");
	portal.showModal(0);




}