/**
 * Griddle SelectionDisplay Component
 * Description: This component on display the data based on meta selections
 *
 * TODO: replace this.props.metadata.selection.items.map by a more
 * 		 efficient method to get item selection caption
 */

import React from 'react';


var SelectionDisplayComponent = React.createClass({
    render: function(){
        let output=this.props.data;
        /*if (this.props.metadata.selection){
            this.props.metadata.selection.items.map((item)=>{
                if (item.value==output)
                    output=item.caption;
            });
        }*/
        return (<span>{output}</span>);
    }
});

export default SelectionDisplayComponent;
