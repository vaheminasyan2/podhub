import React, { Component } from "react";
import Container from "../components/Container/container";
//import List from "../components/List/list";
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
        var usersToRender = [];
        var followings = [];
        API.getUsersToFollow(this.props.user.id)
            .then(res => {
                usersToRender = res.data;
                //console.log("users", res.data);
                API.getUsersFollowed(this.props.user.id)
                    .then(res => {
                        followings = res.data;
                       // console.log("followings", res.data);
                        usersToRender.forEach(user => {
                            user["follow"] = false;
                            followings.forEach(element => {
                                if(user.id === element.id)
                                {
                                    user["follow"] = true;
                                    return;
                                }
                            });
                        });
                        this.setState({
                            allUsers: usersToRender
                        });
                        //console.log(usersToRender);
                    })
            })
            .catch(() => {
                this.setState({
                    allUsers: [],
                    message: "No user found."
                });
            });
    }

    followUser = (id) => {
        let that = this;
        API.followUser(this.props.user.id, id)
            .then(function(response) {
               // console.log(response);
                var users = that.state.users;
                users.forEach(element => {
                    if(element.id === id)
                    {
                        element.follow = true;
                    }        
                });
                that.setState({users: users});
            })
             .catch((err) =>
                 console.log(err)
                )
    }    
    unFollowUser = (id) => {
        let that = this;
        API.unFollowUser(this.props.user.id, id)
            .then(function(response){
                console.log(response);
                var users = that.state.users;
                users.forEach(element => {
                    if(element.id === id)
                    {
                        element.follow = false;
                    }        
                });
                that.setState({users: users});
            })
             .catch((err) =>
                 console.log(err)
                )
    }        

    render() {
        //var userId = JSON.parse(localStorage.getItem("user")).id;
        //console.log("Render", userId);

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
                    <ul className="flexRow">
                        {this.state.users.map(user => (
                            <div className="container bg-dark tile m-2" key={user.id}>
                                <User
                                    userId={user.id}
                                    userName={user.name}
                                    userImage={user.profileImage}
                                    handler={null}
                                />
                                {user.follow?(
                                    <button
                                    className="btn btn-outline-light buttonPosition" 
                                    onClick={(event)=>{
                                        event.preventDefault();
                                        this.unFollowUser(user.id)}
                                    }
                                    >
                                    Unfollow
                                    </button>
                                ):(
                                    <button
                                    className="btn btn-outline-light buttonPosition" 
                                    onClick={(event)=>{
                                        event.preventDefault();
                                        this.followUser(user.id)}
                                    }
                                    >
                                    Follow
                                    </button>
                                )}
                                
                            </div>
                        ))}
                    </ul>
                ) : (
                    <h2>{this.state.message}</h2>
                )}
            </Container>
        )
    }
}

export default UserSearch;
