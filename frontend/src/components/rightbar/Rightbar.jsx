import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";



export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const {user:currentUser, dispatch} =useContext(AuthContext)
  const [followed, setFollowed] = useState(false);

 

  useEffect(() => {
    const getFriends = async () => {
      console.log("getFriends triggered: ");
      try {
        const friendList = await axios.get(`http://localhost:4000/api/users/friends/${user?._id}`);
        setFriends(friendList.data)
      } catch (error) {
        console.log(error);
      }
  }
    getFriends();
  }, [user]);

  async function handleClick() {
    try {
      if (followed) {
        await axios.put(`http://localhost:4000/api/users/${user._id}/unfollow`, {
          userId: currentUser._id
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }
      else {
        await axios.put("http://localhost:4000/api/users/" + user._id + "/follow", {
          userId: currentUser._id
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Monica Khan</b> and <b>3 other friends</b> have birthday today.
          </span>
        </div>
        <img src="assets/ad.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };


  const ProfileRightbar = () => {
    return (
      
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
          
        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Cite:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
           <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
          <div className="rightbarFollowing">
            <img 
            src={
              friend.profilePicture
              ? PF + friend.profilePicture 
              : PF + "person/noPic.png"
              } 
              alt="" 
              className="rightbarFollowingImg" 
              />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
          </Link>
          ))}

        </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
