import React, { Component } from 'react';

class VideoBackground extends Component {

	constructor(){
		super();
			this.index = 0;
			this.videosources = [
				{
					mp4: "https://s3-us-west-1.amazonaws.com/node-quandl/backgroundVideos/Wall+Street-+Gekko+teaches+Bud+about+Capitalism+and+the+Rich-IVjCRWbvM4c.mp4",
					webm: "https://s3-us-west-1.amazonaws.com/node-quandl/backgroundVideos/Wall+Street-+Gekko+teaches+Bud+about+Capitalism+and+the+Rich-IVjCRWbvM4c.webm"
				}
			];

			this.state ={
				mp4src: null,
				webmsrc: null,
				ended: false,
				index: 0,
				view: null,
				banner: null
			};
	}

	componentDidMount(){

		// <h1 style={{color: white}}>Market Analusis and Commentary</h1>
		//

		this.setState({
				mp4src: this.videosources[0].mp4,
				webmsrc: this.videosources[0].webm,
				banner: (
					<div className="videobanner">
						<div className="bannerchild">
							Market Analysis and Commentary
						</div>

						<div className="bannerAd" />

					</div>
				),

				view: (
				<video 
					className="background-video" 
					poster="http://www.forexnewsnow.com/wp-content/uploads/2016/10/Bitcoin.jpg"
					onEnded={()=> {
						this.setState({
							ended: true, 
							view: null
						}); 
					}} 
					playsinline
					autoPlay 
					muted >
					  <source src={this.videosources[this.index].mp4} type="video/mp4"/>
					  <source src={this.videosources[this.index].webm} type="video/webm"/>
				</video>
				),



		});
	}

	componentDidUpdate(){

		if(this.state.ended==true){
			this.index+=1;
			if(this.index==(this.videosources.length) ){
				this.index = 0;
			}
			this.setState({
				ended: false,
				view: (
					<video 
						className="background-video" 
						poster="http://www.forexnewsnow.com/wp-content/uploads/2016/10/Bitcoin.jpg"
						onEnded={()=> {
								this.setState({
									ended: true, 
									view: null
								}); 
						}} 
						autoPlay muted >
					  <source src={this.videosources[this.index].mp4} type="video/mp4"/>
					  <source src={this.videosources[this.index].webm} type="video/webm"/>
					</video>
				)
			});
		}
	}

	render() {
		return (
			<div>
				{this.state.view}
				{this.state.banner}
			</div>
		);
	}
};

export default VideoBackground;