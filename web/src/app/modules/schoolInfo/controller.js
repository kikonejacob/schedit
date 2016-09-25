import debug from 'utils/debug';
import stringRes from 'utils/stringRes';
import Container from './container';
import servicesChannels from 'services/servicesChannels';
import React from 'react';


export default  class schoolInfo {



constructor(){


    debug.log('');
    this.services=servicesChannels('services');


    this.services.trigger('change-title','School information');

    this.title = stringRes.studentBasic;
    this.current = null;
    };

show(){

    let data={};
    let Rendered=(<Container  data={data}  />);
    this.services.trigger('load-content',Rendered,'react');


}
configure(){

}

}
