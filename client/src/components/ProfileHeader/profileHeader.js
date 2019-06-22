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

        //console.log("ProfileHeader Constructing", props.user);

        this.state = {
            user: props.user,
            userName: null,
            newUsername: null,
            userBio: null,
            editProfile: false,
            newBio: null,
            userIsFollowed: null,
            numPosts: 0,
            numFollowers: 0,
            numFollowing: 0,
            followers: [],
            following: [],
            showFollowersModal: false,
            showFollowingModal: false,
            numFavs: 0,
            awsImageurl: null,
            showEditImgModal: false,
            showEditImgBtn: false,
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
            numFavs: this.props.numFavs,
            awsImageurl: this.props.user.awsImageUrl
        }, () => { this.getProfileHeader() });
    }

    getProfileHeader = () => {
        API.getProfileHeader(this.state.user.id)
            .then(res => {
                this.setState({
                    userName: res.data.name,
                    userBio: res.data.aboutMe
                });
            })
            .catch((err) => {
                console.log("Error getting Profile Header", err);
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

        if (prevProps.user.awsImageUrl !== this.props.user.awsImageUrl) {
            this.setState({
                awsImageurl: this.props.awsImageUrl
            });
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
            newBio: event.target.value,
        });
    }

    setNewUsername = (event) => {
        this.setState({
            newUsername: event.target.value
        });
    }

    saveProfile = () => {

        this.setState({
            userName: this.state.newUsername || this.state.userName,
            userBio: this.state.newBio || this.state.userBio,
            editProfile: false
        }, () => {
            let localUser = JSON.parse(localStorage.getItem("user"));

            if (this.state.user.googleId === localUser.googleId) {
                localUser.name = this.state.newUsername || this.state.userName;
                localUser.aboutMe = this.state.newBio || this.state.userBio;
                localStorage.setItem("user", JSON.stringify(localUser));
            }

            API.updateUser(this.props.user.id,
                {
                    name: this.state.newUsername || this.state.userName,
                    aboutMe: this.state.newBio || this.state.userBio,
                });
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
            showFollowersModal: true,
        });
    }

    // Show modal that displays other users being followed
    showFollowingModal = () => {
        this.setState({
            showFollowingModal: true,
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

    // AWS S3 Image upload
    handleFileUpload = event => {
        this.setState({ file: event.target.files });
    };

    submitFile = () => {

        const formData = new FormData();
        formData.append("file", this.state.file[0]);
        let header = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        API.awsImageUpload(this.props.user.id, formData, header)
            .then((res) => {
                this.setState({
                    awsImageurl: res.data.Location
                });

                API.updateUser(this.props.user.id, {
                    awsImageUrl: res.data.Location,
                })
                .then(() => {
                    this.props.refreshUserData();
                });

                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };

    showEditImgBtn = () => {
        this.setState({
            showEditImgBtn: true,
        });
    }

    hideEditImgBtn = () => {
        this.setState({
            showEditImgBtn: false,
        });
    }

    showEditImgModal = () => {
        this.setState({
            showEditImgModal: true,
        });
    }

    hideEditImgModal = () => {
        this.setState({
            showEditImgModal: false,
        });
    }

    render() {

        return (
            <span>
                <div className={`row userProfile rounded bg-${this.props.theme}`}>
                    <div className="col-3">

                        {/* PROFILE IMAGE */}

                        <img
                            src={this.props.user.awsImageUrl || this.state.awsImageUrl || this.props.user.profileImage}
                            alt="User"
                            id="userMainProfileImage"
                            className={`rounded image-${this.props.theme}`}
                            onMouseEnter={this.showEditImgBtn}
                        />

                        {/* EDIT PROFILE IMAGE BUTTON */}

                        {this.state.showEditImgBtn && this.state.user.id === JSON.parse(localStorage.getItem("user")).id ? (
                            <div
                                id="editImgBtn"
                                onClick={this.showEditImgModal}
                                onMouseEnter={this.showEditImgBtn}
                                onMouseLeave={this.hideEditImgBtn}
                            >
                                Change Photo
                            </div>
                        ) : (
                                <></>
                            )}
                    </div>

                    {/* EDIT PROFILE IMAGE MODAL */}

                    <Modal
                        open={this.state.showEditImgModal}
                        onClose={this.hideEditImgModal}
                        className="editImgModal"
                    >
                        <form>
                            <input
                                label="upload file"
                                type="file"
                                onChange={this.handleFileUpload}
                            />
                            <button
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.submitFile();
                                    this.hideEditImgModal();
                                }}
                            >
                                Upload
                            </button>
                        </form>
                    </Modal>

                    <div className="col">

                        {/* User Name */}

                        <Row>
                            {!this.state.editProfile ? (
                                <h2 className={`paddingTop userName profile-${this.props.theme}`}>
                                    {JSON.parse(localStorage.getItem("user")).id === this.state.user.id ? (
                                        this.state.newUsername || this.state.userName || JSON.parse(localStorage.getItem("user")).name
                                    ) : (
                                            this.props.user.name
                                        )}
                                </h2>
                            ) : (
                                    <form>
                                        <textarea
                                            className="rounded"
                                            id="usernameTextarea"
                                            maxLength="75"
                                            onChange={this.setNewUsername}
                                            defaultValue={this.state.newUsername || this.state.userName}
                                        >
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

                                    {/* EDIT BIO */}
                                    <textarea
                                        className="rounded"
                                        id="userBioTextarea"
                                        maxLength="160"
                                        onChange={this.setNewBio}
                                        placeholder="I like listening to podcasts."
                                        defaultValue={this.state.newBio || this.state.userBio}
                                    >
                                    </textarea>
                                </form>

                            ) : (

                                    <span>

                                        {/* BIO */}
                                        <div id="userBio">
                                            {this.state.user.id === JSON.parse(localStorage.getItem("user")).id ? (
                                                this.state.newBio || this.state.userBio || JSON.parse(localStorage.getItem("user")).aboutMe
                                            ) : (
                                                    this.state.userBio || this.props.user.userBio
                                                )}
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