import React,{Component} from "react";

export default class SchoolInfoTitleView extends Component {



	render(){
		var {logoUrl,Name,Adress}=this.props;

			return (<div>
			     <div> School Infomation  </div>
			     <div> 	<img src={logoUrl} /> </div>
			     <div> {Name} <br/> {Adress} </div>


			     </div>)



	}
}