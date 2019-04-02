import React, { Component } from "react";
import Container from "../components/Container/container";
import List from "../components/List/list";
import User from "../components/User/user";
import API from "../utils/API";

// FOLLOWING PAGE
// This page displays who user is following

class Following extends Component {

    state = {
        following: [],
        message: "",
        user: null
    }

    componentDidMount = () => {
        console.log(this.props);
        this.setState({
            user: this.props.location.state.user
        }, () => { this.getFollowing() });
    }

    getFollowing = () => {

        this.setState({
            message: "Loading..."
        });

        API.getFollowing(this.props.location.state.user.id)
            .then(res => {
                console.log(res);
                this.setState({
                    message: "",
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    following: [],
                    message: "No data found."
                });
            });
    }

    render() {
        return (
            <Container>
                {this.state.following.length > 0 ? (
                    <List>
                        {this.state.following.map(user => (
                            <User
                                userId={user.id}
                                userName={user.userName}
                                userImage={user.userImage}
                            />
                        ))}
                    </List>
                ) : (
                    <h2>{this.state.message}</h2>
                )}
            </Container>
        )
    }
}

export default Following;