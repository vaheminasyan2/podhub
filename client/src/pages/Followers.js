import React, { Component } from "react";
import Container from "../components/Container/container";
import User from "../components/User/user";
import List from "../components/List/list";
import API from "../utils/API";

class Followers extends Component {

    state = {
        user: null,
        message: "",
        followers: []
    }

    componentDidMount = () => {

        this.setState({
            user: this.props.location.state.user
        }, () => { this.getFollowers() });
    }

    getFollowers = () => {

        this.setState({
            message: "Loading..."
        });

        API.isFollowedByUsers(this.state.user.id)
            .then(res => {
                console.log(res);
                this.setState({
                    followers: res.data,
                    message: ""
                });
            });
    }

    render() {
        return (
            <Container>
                <h2>Users following {this.props.location.state.user.name}</h2>

                {this.state.followers.length ? (
                    <List>
                        {this.state.followers.map(follower =>
                            <User
                                userId={follower.id}
                                userName={follower.name}
                                userImage={follower.image}
                                handler={null}
                            />
                        )}
                    </List>
                ) : (
                    this.state.message != "Loading..." ? (
                        <h2>No followers found.</h2>
                    ) : (
                        <></>
                    )
                )}

                <h2>{this.state.message}</h2>
            </Container>
        )
    }
}

export default Followers;