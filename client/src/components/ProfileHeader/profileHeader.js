import React, { Component } from "react";
//import Container from "../Container/container";
import Row from "../Row/row";
import Modal from "react-responsive-modal";
import User from "../User/user";
import List from "../List/list";
import API from "../../utils/API";
import "./profileHeader.css";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);

        console.log("ProfileHeader Constructing", props.user);

        this.state = {
            user: props.user,
            userName: props.user.name,
            newUsername: null,
            userLocation: props.user.location,
            userBio: props.user.aboutMe,
            editProfile: false,
            newLocation: null,
            newBio: null,
            userIsFollowed: null,
            numPosts: 0,
            numFollowers: 0,
            numFollowing: 0,
            followers: [],
            following: [],
            showFollowersModal: false,
            showFollowingModal: false,
            numFavs: 0
        }
    }

    componentDidMount = () => {
        this.getNumFollowers();
        this.getNumFollowing();
        this.isUserFollowed();

        let buttonTheme = "dark";

        if (this.props.theme === "dark") {
            buttonTheme = "light";
        }

        this.setState({
            user: this.props.user, 
            buttonTheme: buttonTheme,
            numFavs: this.props.numFavs
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user.id !== this.props.user.id) {
            this.getNumFollowers();
            this.getNumFollowing();
            this.isUserFollowed();
            this.setState({
                user: this.props.user
            });
        }

        if (prevState.userIsFollowed !== this.state.userIsFollowed) {
            this.getNumFollowers();
            this.getNumFollowing();
        }
    }


    // SET UP HEADER
    // =============================================== 

    // Get number of FOLLOWERS for user
    getNumFollowers = () => {
        API.getFollowers(this.props.user.id)
            .then(res => {
                this.setState({
                    numFollowers: res.data[0].count
                });
            })
            .catch(() => {
                this.setState({
                    numFollowers: 0
                });
            });
    };

    // Get number of other users that current user is FOLLOWING
    getNumFollowing = () => {
        API.getFollowing(this.props.user.id)
            .then(res => {
                this.setState({
                    numFollowing: res.data[0].count
                });
            })
            .catch(() => {
                this.setState({
                    numFollowing: 0
                });
            });
    };


    // EDIT PROFILE
    // =============================================== 

    editProfile = () => {
        this.setState({
            editProfile: true
        });
    }

    setNewBio = (event) => {
        this.setState({
            newBio: event.target.value
        });
    }

    setNewLocation = (event) => {
        this.setState({
            newLocation: event.target.value
        });
    }

    setNewUsername = (event) => {
        this.setState({
            newUsername: event.target.value
        });
    }

    saveProfile = () => {
        API.updateUser(this.props.user.id, 
            {
                name: this.state.newUsername || this.state.userName,
                aboutMe: this.state.newBio || this.state.userBio,
                location: this.state.newLocation || this.state.userLocation
            })
        this.setState({
            userName: this.state.newUsername || this.state.userName,
            userBio: this.state.newBio || this.state.userBio,
            userLocation: this.state.newLocation || this.state.userLocation,
            editProfile: false
        });
    }

    cancelEditProfile = () => {
        this.setState({
            editProfile: false
        });
    }


    // LIST OF FOLLOWERS / FOLLOWINGS, MODALS
    // ===============================================

    // Get list of user's followers
    getFollowers = () => {
        API.isFollowedByUsers(this.state.user.id)
            .then(res => {
                this.setState({
                    followers: res.data,
                }, () => { this.showFollowersModal() });
            });
    }

    // Get list of other users that user is following
    getUsersFollowed = () => {
        API.getUsersFollowed(this.state.user.id)
            .then(res => {
                this.setState({
                    following: res.data
                }, () => { this.showFollowingModal() });
            });
    }

    // Show modal that displays followers
    showFollowersModal = () => {
        this.setState({
            showFollowersModal: true
        });
    }

    // Show modal that displays other users being followed
    showFollowingModal = () => {
        this.setState({
            showFollowingModal: true
        });
    }

    // Hide Followers and Followings modals
    hideFollowersModal = () => {
        this.setState({
            showFollowersModal: false,
            showFollowingModal: false
        });
    }

    // FOLLOW / UNFOLLOW USER
    // ===============================================

    // Checks to see if user is following viewed user
    isUserFollowed = () => {

        // Get current user's ID
        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        // Get list of users followed by current user
        API.getUsersFollowed(currUserId)
            .then(res => {

                let usersFollowed = res.data;

                // Look for viewed user's ID in list of followed users
                usersFollowed.forEach(element => {
                    if (this.state.user.id === element.id) {

                        this.setState({
                            userIsFollowed: true
                        });

                        return;
                    }
                });
            });
    }

    // Follows user if follow button is clicked
    followUser = (userId) => {

        let that = this;
        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.followUser(currUserId, userId)
            .then(function (response) {
                that.setState({
                    userIsFollowed: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Unfollows user if unfollow button is clicked
    unfollowUser = (userId) => {

        let that = this;
        let currUserId = JSON.parse(localStorage.getItem("user")).id;

        API.unFollowUser(currUserId, userId)
            .then(function (response) {
                that.setState({
                    userIsFollowed: false
                });
            })
            .catch((err) =>
                console.log(err)
            )
    }


    // OTHER
    // ===============================================

    // Scrolls to post section when Posts is clicked from profile header
    scrollTo = () => {

        let to = 350;

        if (this.props.numFavs > 0) {
            to = 580;
        }

        window.scrollTo(0, to);
    }


    render() {

        return (
            <span>
                <div className={`row userProfile rounded bg-${this.props.theme}`}>
                    <div className="col-3">
                        <img
                            src={this.props.user.profileImage}
                            alt="User"
                            id="userMainProfileImage"
                            className={`rounded image-${this.props.theme}`}
                        />
                    </div>

                    <div className="col">

                        {/* User Name */}

                        <Row>
                            {!this.state.editProfile ? (
                                <h2 className={`paddingTop userName profile-${this.props.theme}`}>{this.state.userName || this.props.user.name}</h2>
                            ) : (
                                <form>
                                    <textarea
                                        className="rounded"
                                        id="usernameTextarea"
                                        maxLength="75"
                                        onChange={this.setNewUsername}
                                        value={this.state.newUsername || this.state.userName}
                                    >
                                        {this.state.userName || this.state.userName}
                                    </textarea>
                                </form>
                            )}
                        </Row>

                        {/* Follow / Edit Profile Button */}

                        {this.props.user.id !== JSON.parse(localStorage.getItem("user")).id ? (
                            this.state.userIsFollowed ? (
                                <button
                                    className={`btn btn-outline-${this.state.buttonTheme} followBtn`}
                                    onClick={(event) => { event.preventDefault(); this.unfollowUser(this.state.user.id) }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                    <button
                                        className={`btn btn-outline-${this.state.buttonTheme} followBtn`}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            this.followUser(this.state.user.id)
                                        }}
                                    >
                                        Follow
                                </button>
                                )
                        ) : (
                                !this.state.editProfile ? (
                                    <button
                                        className={`btn btn-outline-${this.state.buttonTheme} editProfileBtn`}
                                        onClick={this.editProfile}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                        <></>
                                    )
                            )
                        }

                        {/* User Info: Posts, Followers, Following */}

                        <Row>

                            {this.state.editProfile ? (
                                <form id="editProfileHeader">

                                    <div id="editButtons">
                                        <button
                                            className={`btn btn-${this.props.theme} btn-sm cancelBtn`}
                                            onClick={this.cancelEditProfile}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={`btn btn-${this.props.theme} btn-sm saveBtn`}
                                            onClick={this.saveProfile}
                                        >
                                            Save
                                        </button>
                                    </div>

                                    {/* EDIT LOCATION */}
                                    <textarea
                                        className="rounded"
                                        id="userLocationTextarea"
                                        maxLength="100"
                                        onChange={this.setNewLocation}
                                        placeholder="Seattle, WA"
                                        value={this.state.newLocation}
                                    >
                                        {this.state.userLocation}
                                    </textarea>

                                    {/* EDIT BIO */}
                                    <textarea
                                        className="rounded"
                                        id="userBioTextarea"
                                        maxLength="160"
                                        onChange={this.setNewBio}
                                        placeholder="I like listening to podcasts."
                                        value={this.state.newBio}
                                    >
                                        {this.state.userBio}
                                    </textarea>
                                </form>

                            ) : (

                                    <span>

                                        {/* LOCATION */}
                                        <div id="userLocation">
                                            {this.state.userLocation}
                                        </div>

                                        {/* BIO */}
                                        <div id="userBio">
                                            {this.state.userBio}
                                        </div>

                                    </span>
                                )}

                        </Row>
                    </div>
                </div>

                {/* STATS BUTTONS */}

                <div className={`row userStats rounded bg-${this.props.theme}`}>

                    <div className="rounded" id="statsBtns">

                        {/* POSTS */}

                        <span className={`btn btn-${this.props.theme} postsBtn`} onClick={this.scrollTo}>
                            Posts:&nbsp; {this.props.numPosts}
                        </span>

                        {/* FOLLOWERS */}

                        <button
                            className={`btn btn-${this.props.theme}`}
                            onClick={this.getFollowers}
                        >
                            Followers:&nbsp;{this.state.numFollowers}
                        </button>

                        {/* FOLLOWING */}

                        <button
                            className={`btn btn-${this.props.theme}`}
                            onClick={this.getUsersFollowed}
                        >
                            Following:&nbsp;{this.state.numFollowing}
                        </button>

                    </div>
                </div>

                {/* FOLLOWERS MODAL */}

                <Modal
                    open={this.state.showFollowersModal}
                    onClose={this.hideFollowersModal}
                    classNames={{ modal: "followersModal" }}
                >
                    <h4 className="modalTitle">Followers</h4>

                    {this.state.followers.length ? (
                        <List>
                            {this.state.followers.map(user =>
                                <div className="container tile m-2 userList" key={user.id}>
                                    <User
                                        userId={user.id}
                                        userName={user.name}
                                        userImage={user.image}
                                        handler={this.hideFollowersModal}
                                    />
                                </div>
                            )}
                        </List>
                    ) : (
                            this.state.message !== "Loading..." ? (
                                <h2>No followers found.</h2>
                            ) : (
                                    <></>
                                )
                        )}

                    <h2>{this.state.message}</h2>

                </Modal>

                {/* FOLLOWING MODAL */}

                <Modal
                    open={this.state.showFollowingModal}
                    onClose={this.hideFollowersModal}
                    classNames={{ modal: "followersModal" }}
                >
                    <h4 className="modalTitle">Following</h4>

                    {this.state.following.length ? (
                        <List>
                            {this.state.following.map(user =>
                                <div className="container tile m-2 userList" key={user.id}>
                                    <User
                                        userId={user.id}
                                        userName={user.name}
                                        userImage={user.profileImage}
                                        handler={this.hideFollowersModal}
                                    />
                                </div>
                            )}
                        </List>
                    ) : (
                            this.state.message !== "Loading..." ? (
                                <h2>User is not following anyone.</h2>
                            ) : (
                                    <></>
                                )
                        )}

                    <h2>{this.state.message}</h2>

                </Modal>

            </span>
        );
    }

}

export default ProfileHeader;