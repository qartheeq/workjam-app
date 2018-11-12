import React, { Component } from 'react';
import './App.css';
import WorkjamList from './WorkjamList';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          stories: [],
          storyDetails: [],
        };
    }
    componentDidMount () {
        const self = this;
        fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then(res => res.json()).then((response) => {
            const firstTen = response.slice(0,10)
            self.setState({stories: firstTen});
            let details = [];
            for (var i=0;i<10;i++) {
                fetch('https://hacker-news.firebaseio.com/v0/item/'+firstTen[i]+'.json').then(res1 => res1.json()).then((response1) => {
                    details.push(response1);
                    self.setState({storyDetails: details});
                    console.log(self.state.storyDetails);
                });
            }
        });
    }
    render() {
        if(this.state.storyDetails.length>0) {
            return (
              <div>
                <h1>WorkjamList News Stories</h1>
                  <WorkjamList properties={this.state.storyDetails} />		  	
              </div>
            );
        } else {
            return (<div>Loading</div>);
        }
    }
}
export default App;