import React, { Component } from 'react';
import './App.css';


export default class WorkjamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsList: [],
            showComments: false
        }
    }

    selectStory(property) {
        console.log('prop ',property);
        const commentsList = property.kids.slice(0,20);
        let comments = [];
        let maxLen = commentsList.length > 20 ? 20 : commentsList.length;
        const self = this;
        for (var i=0; i<maxLen; i++) {
            fetch('https://hacker-news.firebaseio.com/v0/item/'+commentsList[i]+'.json').then(res1 => res1.json()).then((response1) => {
                comments.push(response1);
                self.setState({commentsList: comments});
                console.log(self.state.commentsList);
                self.setState({showComments: true});
            });
        }
    }

    hideComments() {
        this.setState({showComments: false});
    }

    render() {
        return (
            <div className="list-container">
                {!this.state.showComments ?
                    <div className="container">
                        <div className="row title">
                            <div className="col-md-2 col-4 col grid-items">By</div>
                            <div className="col-md-4 col-6 grid-items">Title</div>
                            <div className="col-md-2 d-none d-md-block grid-items">Id</div>
                            <div className="col-md-2 d-none d-md-block grid-items">Score</div>
                            <div className="col-md-2 col-2 grid-items">Type</div>
                        </div>
                        {this.props.properties.map(property => (
                            <div className="row" key={property.id} onClick={() => this.selectStory(property)}>
                                <div className="col-md-2 col-4 grid-items">{property.by}</div>
                                <div className="col-md-4 col-6 grid-items">{property.title}</div>
                                <div className="col-md-2 d-none d-md-block grid-items">{property.id}</div>
                                <div className="col-md-2 d-none d-md-block grid-items">{property.score}</div>
                                <div className="col-md-2 col-2 grid-items">{property.type}</div>
                            </div>
                        ))}
                    </div> : '' 
                } 

                {this.state.showComments ? 
                    <div>
                        <div className="img-container">
                            <img onClick={() => this.hideComments()} alt="X" src="https://img.icons8.com/linen/50/000000/delete-sign.png"/>
                        </div>
                        <div className="modal-pane">
                            {this.state.commentsList.map(comment => (
                                <div className="row" key={comment.id}>
                                    <div className="col-md-2 col-sm-4 grid-items">{comment.by}</div>
                                    <div className="col-md-8 col-sm-6 grid-items">{comment.text}</div>
                                    <div className="col-md-2 col-sm-2 grid-items">{comment.type}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    : 
                    <span></span>
                }
                
            </div>

        )
    }
}