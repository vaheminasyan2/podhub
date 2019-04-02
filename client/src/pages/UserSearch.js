import React, { Component } from "react";
import Container from "../components/Container/container";
import List from "../components/List/list";
import User from "../components/User/user";
// import API from "../utils/API";
import "./UserSearch.css";
import API from "../utils/API";

// USER SEARCH PAGE

class UserSearch extends Component {

    state = {
        message: "",
        userSearch: "",
        users: [],
        allUsers: []
    }

    componentDidMount() {
        this.getUsers();
    };

    // Listen for when user enters text into User search field
    handleInputChange = event => {
        this.setState({
            userSearch: event.target.value,
        }, () => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => this.checkContent(), 500);
        });
    };

    // Check if User Search input has text and show/hide
    checkContent = () => {
        // Show Podcast search results
        if (this.state.userSearch !== "" && this.state.userSearch.length > 1) {
            let filteredUsers = [];
            this.state.allUsers.forEach(u => {
                if(u.name.toLowerCase().includes(this.state.userSearch.toLowerCase())) {
                    filteredUsers.push(u);
                }
            }); 
            this.setState({users: filteredUsers});
        }
    }

    getUsers = () => {
        API.getUsersToFollow(this.props.user.id)
            .then(res => {
                this.setState({
                    allUsers: res.data
                });
            })
            .catch(() => {
                this.setState({
                    allUsers: [],
                    message: "No user found."
                });
            });
    }

    followUser = (event) => {
        event.preventDefault();

        alert("Followed!");
    }

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

    render() {
        var userId = JSON.parse(localStorage.getItem("user")).id;
        console.log("Render", userId);

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
                            <div key={user.id}>
                                <User
                                    userId={user.id}
                                    userName={user.name}
                                    userImage={user.profileImage}
                                    handler={null}
                                />
                                <button 
                                    className="btn btn-primary" 
                                    onClick={this.followUser}
                                >
                                    Follow
                                </button>
                            </div>
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