import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import NotificationLikesOrComments  from "../components/Notification/NotificationLikesOrComments";
import NotificationFollowers  from "../components/Notification/NotificationFollowers";
import "./Notifications.css"

// NOTIFICATION PAGE

class Notification extends Component {

    state = {
        newLikes: [],
        newComments: [],
        newFollowers: [],
        message: "",
        user: null
    };

    componentDidMount() {
        //console.log(this.props.user.id)
        //this.checkNewLikes();
        //this.checkNewComments();
        //this.checkNewFollowers();
    };

    checkNewLikes = () => {

    }

    checkNewComments = () => {

    }

    checkNewFollowers = () => {

    }


    render() {
        return (
            <div className={`container bg-${this.props.theme} rounded`} id="post-container">
                <Row>
                    {
                        this.state.newLikes > 0 ||
                            this.state.newComments > 0 ||
                            this.state.newFollowers > 0
                            ?
                            (
                                <Container>
                                    {this.state.newLikes.map(newLikes => (
                                        <NotificationLikesOrComments 
                                        
                                        />
                                    ))}
                                    {this.state.newComments.map(newComments => (
                                        <NotificationLikesOrComments 
                                        
                                        />
                                    ))}
                                    {this.state.newFollowers.map(newFollowers => (
                                        <NotificationFollowers 
                                        
                                        />
                                    ))}

                                </Container>
                            )
                            :
                            (
                                <h4 className="text-center">{this.state.message}</h4> 
                            )
                    }
                </Row>
            </div>
        )
    }
}

export default Notification;
