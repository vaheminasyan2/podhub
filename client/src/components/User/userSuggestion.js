import React from "react";
import { Link } from "react-router-dom";
import "./user.css";

// USER SUGGESTION COMPONENT
// This component appears in the User Search results dropdown when
// a query is typed into the User Search box in the nav bar. 
// It contains a link to the User List page.

function UserSuggestion ({ userId, userName, userImage, handler }) {
    
    return (

        <Link to={{
            pathname: "/userList",
            state: {
                userId: userId,
                userName: userName,
                userImage: userImage
            }
            }}
            className="userSuggestion"
            onClick={handler}>

            <span><img className="userImageSmall" src={userImage} alt="User Image"/></span>
            <span><p className="userName">{userName}</p></span>
        </Link>
    );
};

export default UserSuggestion;