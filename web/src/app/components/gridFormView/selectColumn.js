import React from "react"
import * as Radio from 'radio';

/* on construction */

let SelectedComponent = React.createClass( {

    

    getInitialState() {
        return {
            checked: _.contains( recipeOilIds, this.props.rowData.id ),
            radio:Radio.channel()
        };
    },

    render() {
        return (
            <input
                type="check box"
                checked={this.state.checked}
                onChange={this.handleChange}
                />
        );
    },

    handleChange() {
        if ( this.state.checked ) {
            this.radio.trigger('unselect',this.props.rowData.id);
            //recipeOilIds = _.without( recipeOilIds, this.props.rowData.id );
        } else {
            this.radio.trigger('select',this.props.rowData.id)
            //recipeOilIds.push( this.props.rowData.id );
        }

        this.setState( {
            checked: !(this.state.checked)
        } );
    }
} );


module.exports=SelectedComponent