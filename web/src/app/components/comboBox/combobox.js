import React,{Component} from 'react';


export default  class Link  extends Component{

    render(){
        let Options=this.props.map(function(item){
            return (<option value={item.value}>item.caption</option>);
        });

        return(<select required="required" className="form-control">
                  {Options}
               </select>);


    	}
}
