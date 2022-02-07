import { MoreVert } from "@material-ui/icons";
import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user:currentUser} = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id,post.likes])

    useEffect( () => {
        const fetchUser = async () => {
          await axios.get(`http://localhost:4000/api/users?userId=${post.userId}`).then((res) => {
            setUser(res.data)
          })
          
        };
        fetchUser();
        
      }, [post.userId]);




    const likeHandler = () => {
        try {
            axios.put("http://localhost:4000/api/posts/" + post._id + "/like", {userId: currentUser._id})
        } catch (error) {
            
        }

        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked)
    }

  return (
      <div className="post">
          <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noPic.png"} alt="" />
                    </Link>
                    <span className="postUserName">
                        {user.username}
                    </span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
              </div>
              <div className="postCenter">
                  <span className="postText">{post?.desc}</span>
                  <img className="postImg" src={PF+post.img} alt="" />
              </div>
              <div className="postBottom">
                  <div className="postBottomLeft">
                      <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler} />
                      <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler} />
                      <span className="postLikeCounter">{like} people like it</span>
                  </div>
                  <div className="postBottomRight">
                      <span className="postCommentText">{post.comment} Comments</span>
                  </div>
              </div>
          </div>
      </div>
  )
}
