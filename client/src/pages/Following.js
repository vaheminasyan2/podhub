import React, { Component } from "react";
import Container from "../components/Container/container";
import User from "../components/User/user";
import List from "../components/List/list";
import API from "../utils/API";

class Following extends Component {

    state = {
        user: null,
        message: "",
        usersFollowed: []
    }

    componentDidMount = () => {

        this.setState({
            user: this.props.location.state.user
        }, () => { this.getUsersFollowed() });
    }

    getUsersFollowed = () => {

        this.setState({
            message: "Loading..."
        });

        API.getUsersFollowed(this.state.user.id)
            .then(res => {
                this.setState({
                    usersFollowed: res.data,
                    message: ""
                });
            });
    }

    render() {
        return (
            <Container>

                <h2>Users {this.props.location.state.user.name} Follows</h2>

                {this.state.usersFollowed.length ? (
                    <List>
                        {this.state.usersFollowed.map(user =>
                            <User
                                userId={user.id}
                                userName={user.name}
                                userImage={user.profileImage}
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

export default Following;