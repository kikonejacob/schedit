/**
 * Griddle LinkComponent
 *
 * TODO: replace this.props.metadata.selection.items.map by a more
 * 		 efficient method to get item selection caption
 */

import React from 'react';


var LinkComponent = React.createClass({
    render: function(){
        let output=this.props.data;
        let key=this.props.metadata.linkKey;
        /*if (this.props.metadata.selection){
            this.props.metadata.selection.items.map((item)=>{
                if (item.value==output)
                    output=item.caption;
            });
        }*/
        key=(key==undefined)?'id':key;
        let url =this.props.metadata.partialLink + this.props.rowData[key];
        return (<a className='sch-griddle-main-link' href={url}>{output}</a>);
    }
});

export default LinkComponent;
