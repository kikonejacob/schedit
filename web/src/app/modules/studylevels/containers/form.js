import React,{Component,PropTypes}  from 'react';
import   FormView, {btSaveCancel} from 'components/FormView/schema-form';
import * as schema from '../schemas/form.studylevel.schema.json' ;
import { connect } from 'react-redux';
import {levelCreate,levelSave} from '../lib/actions.js';




export default class Form extends Component{

    handleActions(action,data){
        const {dispatch,uiCtl}=this.props;
        switch(action)
        {
        case 'cancel':
            uiCtl.routeBack();
            break;

        case 'submit':
            if (this.props.dataId==-1)
                dispatch(levelCreate(data));
            else {
                dispatch(levelSave(data.id,data));
            }
        }
    }

    render(){
        const {schema,uiSchema,data}=this.props;
        return(<div>
              <FormView formButtons={btSaveCancel}
                        schema={schema}
                        uiSchema={uiSchema}
                        data={data}
                        onAction={this.handleActions.bind(this)}/>
            </div>);
    }



}


Form.propTypes = {
    data: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state,ownProps) {
    const { levels,activeContainer } = state;
    const {
          data,
          lastUpdated,
          isFetching
          } = levels[activeContainer.levelId]|| {
              isFetching: false,
              data:{},
          };
    const uiSchema=ownProps.rawSchema.uiSchema;
    const schema={...ownProps.rawSchema.schema};
    return {
        data,
        isFetching,
        lastUpdated,
        uiSchema,
        schema
    };
}
export default connect(mapStateToProps)(Form);
