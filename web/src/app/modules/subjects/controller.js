import debug from 'utils/debug.js';
import stringRes from 'utils/stringRes';
import List from './containers/list';
import DeleteList from './containers/delete';
import Form from './containers/form';
import servicesChannels from 'services/servicesChannels';
import PageableCollection from 'utils/pageableCollection';
import React from 'react';
import RestData from 'utils/restdata';

const API_URL='../api/subjects';
const LIST_TITLE='List of subjects';
const FORM_TITLE='Subject';



export default  class schoolInfo {

handleSubmit(e,data,action){

    let services = servicesChannels('services');
    console.log(data);

    switch(action)
    {
    case 'cancel':
        services.trigger('routeBack');
        break;

    case 'submit':
        services.trigger('routeBack');


    }

};

handleActions(e,action){

    switch (action){
    case 'delete':

        this.handleDelete(action) ;
        break;


    }


}

handleDelete(){//to do: find a way to


    let confirmResult=confirm('Are you sure you want to delete these items ?');
    if (confirmResult==true)
    {

        console.log(this.selectedIds);

        console.log( this.Rendered.type.getdata());
    }


}

constructor(){

    this.services = servicesChannels('services');
    debug.log('creating study level controller..');

    this.title = stringRes.studentBasic;

    this.current = null;

};

index()
{

    var collection=new PageableCollection({url:API_URL});
    var Rendered=(<List  collection={collection}/>);
    this.services.trigger('change-title',LIST_TITLE);

    this.services.trigger('load-content',Rendered,'react');


}
delete(){

    this.selectedIds=[];
    let  collection=new PageableCollection({url:API_URL});
    let header={ description:'select the levels you want to delete and click on delete',
                 onAction:this.handleActions.bind(this)};
    this.Rendered=(<DeleteList {...header} collection={collection}
                         multiselect={true} selectedIds={this.selectedIds} />);
    this.services.trigger('load-content',this.Rendered,'react');



}

create(){


    let data={};

    return(<div> <Form data={data} onSubmitForm={this.handleSubmit}  />  </div>);


}
show(options){

    var services=this.services;

    this.current=options[0];
    this.model=new RestData({
        channel:'student.info',
        url:API_URL+'/'+this.current

    });

    this.model.get().done(function(response){

        debug.log(response.data);
        this.services.trigger('change-title',FORM_TITLE);


        let Rendered=(<Form  data={response.data} onSubmitForm={this.handleSubmit} />);

        services.trigger('load-content',Rendered,'react');      

    }.bind(this));
}
configure(){

}


}
