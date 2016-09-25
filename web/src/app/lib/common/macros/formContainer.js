import Form from 'common/containers/form/formC';
import React from 'react';
import { Provider } from 'react-redux';
import {refreshGridOptions} from 'lib/grid/actions.js';


export default function FormContainer(store,schema,id,dataSource,onAction){

    return (<Provider store={store}>
                <Form   schema={schema}
                        onAction={onAction}
                        id={id}
                       datasource={dataSource}/>
            </Provider>);

};
