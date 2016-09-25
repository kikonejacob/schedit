import React,{PropTypes,Component} from 'react';


export class CollectionView extends Component{
    componentDidMount(){

    }
    setpage(){
        this.props.collectionMgr();
    };


    getRenderedItem(item){
        const {columns,multiselect}=this.props;
        let extra,output;
        output=columns.map((column)=>{
            const meta=getMeta(column);
            let columnOutput=item.text;
            if (meta){
                if (meta.customComponent>'')
                    output=(React.createElement(meta.customComponent,
                        {item,meta}));
            }
            return (<li className='list-group-item' key={item.id+'.'+column}>
                        {columnOutput}
                    </li>);
        });
        if (multiselect)
            extra=(<li>'checkbox' </li>);
        return (<div>output</div>);
    }

    render(){
        const {results}=this.props;
        const getRenderedItem=this.getRenderedItem;

        return(<ul className='list-group'>
                  {results.map((item)=>{
                      return  getRenderedItem(item);
                  })
                  }
            </ul>);
    }
}
