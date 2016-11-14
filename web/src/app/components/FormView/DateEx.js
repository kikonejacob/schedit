var subschema = require('subschema');
var loader = subschema.loader;
var React = require('react');
var FieldValueMixin = subschema.FieldValueMixin;
var moment = require('moment');
var JK = require('react-bootstrap-datetimepicker');





var DateExInput = React.createClass({
    mixins: [FieldValueMixin],
    bela(e) {

        e.preventDefault();
        console.log(this.state);

    },

    render: function () {

        var {onChange, onValueChange, onBlur, className, field, value, dataType, value, fieldAttrs, type} = this.props;

        console.log(this.state);
        console.log(value);
        return (
            <div>
                <JK

                    ref="input"
                    onBlur= { this.handleValidate }
                    onChange= { this.handleChange }
                    id= { this.props.name }
                    className="form-control"
                    format="YYYY-MM-DD"
                    inputFormat="YYYY-MM-DD"
                    dateTime= { this.state.value }
                    mode="date"
                    {...this.props} {...fieldAttrs} />

                <button onClick= { this.bela } > dddfdf </button>
            </div>
        );

    }
});

module.exports = DateExInput;
