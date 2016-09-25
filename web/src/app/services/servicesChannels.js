import Radio from 'backbone.radio';

export default function(channelName){
	    console.log('channelName');
		return Radio.channel(channelName);
}  ;
