import React, { Component } from "react";
import Container from "../components/Container/container";
import List from "../components/List/list";
import User from "../components/User/user";
// import API from "../utils/API";
import "./UserSearch.css";

// USER SEARCH PAGE

class UserSearch extends Component {

    state = {
        message: "",
        userSearch: "",
        users: []
    }

    // Listen for when user enters text into User search field
    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        }, () => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => this.checkContent(), 500);
        });
    };

    // Check if User Search input has text and show/hide
    checkContent = () => {
        // Show Podcast search results
        if (this.state.userSearch !== "") {
            this.getUsers();
        }
    }

    getUsers = () => {

        this.setState({
            users: [
                {
                    userId: "1",
                    userName: "Curtis",
                    userImage: "https://picsum.photos/200"
                }, 

                {
                    userId: "1",
                    userName: "John",
                    userImage: "https://picsum.photos/200"
                }
            ]
        });

        // API.getUsers()
        //     .then(res =>
        //         this.setState({
        //             users: res.data
        //         })
        //     )
        //     .catch((err) =>
        //         console.log(err),
        //         this.setState({
        //             message: "No users found.",
        //             users: [],
        //         }),
        //     )
    }

    render() {
        return (
            <Container>

                <form className="form-inline my-2 my-lg-0 searchUserForm">
                    <input className="form-control searchUserInput"
                        type="search"
                        placeholder="Search for user"
                        aria-label="Search"
                        id="userInput"
                        value={this.state.userSearch}
                        onChange={this.handleInputChange}
                        name="userSearch"
                        autoComplete="off"
                        required
                    />
                </form>

                {this.state.users.length ? (
                    <List>
                        {this.state.users.map(user => (
                            <User
                                userId={user.id}
                                userName={user.userName}
                                userImage={user.userImage}
                                handler={null}
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

export default UserSearch;