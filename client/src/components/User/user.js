import React from "react";
import { Link } from "react-router-dom";
import "./user.css";

// USER COMPONENT
// This component represents an individual user.
// It displays information such as User Name, Profile Image, and number of Followers.
// It includes a link to the user's profile page.

function User ({ userId, userName, userImage, theme, handler }) {
    
    return (

        <Link to={{
            pathname: "/profile",
            state: {
                user: {
                    id:userId,
                    name:userName,
                    profileImage:userImage
                }
            }
            }}
            className="user"
            onClick={handler}>

            <span><img className="userImage" src={userImage} alt="User"/></span>
            <span><p className={`userName searchName color-${theme}`}>{userName}</p></span>
        </Link>
    );
};

export default User;