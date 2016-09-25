import React,{Component} from 'react';


export default  class InlineList extends Component{



    render(){


        let listNodes=this.props.data.map(function(item){

            let {captionField,keyField,linkUrl}=this.props;
            let link=linkUrl.replace(':key',item[keyField]);
            return (<li key={item.id}>
                        <a href={link}>
                        {item[captionField]}
                        </a>
                    </li>);

        }.bind(this));

        return (
    		<ul className='list-inline'>
    			{listNodes}
    		</ul>
    		);



    }

}
