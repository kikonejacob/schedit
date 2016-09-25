import List from 'lib/containers/listForm/list';
import React from 'react';
import { Provider } from 'react-redux';
import {refreshGridOptions} from 'lib/grid/actions.js';


export default function ListContainer(store,schema,onAction){

    return (<Provider store={store}>
                <List  schema={schema} onAction={onAction}
                       refreshGridOptions={refreshGridOptions}/>
            </Provider>);

};
