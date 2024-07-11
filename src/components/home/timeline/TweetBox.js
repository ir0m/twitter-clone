import React, { useState ,useEffect} from 'react'
import {Avatar} from "@mui/material"
import {Button} from "@mui/material"
import "./TweetBox.css"
import { collection, addDoc ,serverTimestamp, Timestamp} from "firebase/firestore";
import {db,auth} from "../../../firebase";
import { onAuthStateChanged } from 'firebase/auth';

function TweetBox() {
  const [tweetMessage,setTweetMessage]=useState("");
  const [tweetImage,setTweetImage]=useState("");

  const [user,setUser]=useState("");
  useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      
      setUser(currentUser);
    });
  },[]);

  const email=user.email;


  const sendTweet = (e) =>{
    e.preventDefault();
    addDoc(collection(db,"posts"),{
      text:tweetMessage,
      image:tweetImage,
      timestamp:serverTimestamp(),
      email:email,
    });
    setTweetImage("");
    setTweetMessage("");
  };

  return (
    <div className='tweetBox'>
      <form>
        <div className='tweetBox_input'>
            <Avatar></Avatar>
            <input value={tweetMessage} placeholder='今どうしてる？' type='text' onChange={(e)=>setTweetMessage(e.target.value)}>
            </input>
        </div>
        <input value={tweetImage} className='tweetBox_imageInput' placeholder='画像のURLを入力して下さい' type='text' onChange={(e)=>setTweetImage(e.target.value)}>
        </input>
        <Button className='tweetBox_tweetButton' type='submit' onClick={sendTweet}>ツイートする</Button>
      </form>
    </div>
  )
}

export default TweetBox
