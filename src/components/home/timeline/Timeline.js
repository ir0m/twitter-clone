import React, { useEffect, useState } from 'react'
import TweetBox from './TweetBox'
import Post from './Post'
import "./Timeline.css"
import {db,auth} from '../../../firebase'
import { collection, getDocs, onSnapshot, orderBy, query, doc,getDoc,QuerySnapshot} from "firebase/firestore"; 
import FlipMove from 'react-flip-move'
import { onAuthStateChanged } from 'firebase/auth';
import { Avatar } from '@mui/material'
import { Switch } from '@mui/material'

function Timeline() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const postData=collection(db,"posts");
    const q=query(postData,orderBy("timestamp","desc"))
    getDocs(q).then((QuerySnapshot)=>{
      onSnapshot(q,(QuerySnapshot)=>{
        setPosts(QuerySnapshot.docs.map((doc)=>doc.data()))
      })
    },[]);
  })
  
  const [user,setUser]=useState([]);
  useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      
      setUser(currentUser);
    });
  },[]);
  const email=user.email;

  const [users,setUsers]=useState([]);
  useEffect(()=>{
    const postData=collection(db,"users");
    const q=query(postData,orderBy("email","desc"))
    getDocs(q).then((QuerySnapshot)=>{
      onSnapshot(q,(QuerySnapshot)=>{
        setUsers(QuerySnapshot.docs.map((doc)=>doc.data()))
      })
    },[]);
  })
  var displayNames={};
  var usernames={};
  var avatars={};
  var displayNames={};
  for(let i=0;i<users.length;i++){
    displayNames[users[i].email]=users[i].displayName;
    usernames[users[i].email]=users[i].username;
    avatars[users[i].email]=users[i].avatar;
  }
  const [onlyMe,setOnlyMe]=useState(true);
  const changeOnlyMe=()=>{
    setOnlyMe(!onlyMe);
  }
  return (
    <div className='timeline'>
      {/*header*/}
      <div className='timeline_header'>
        <h2>ホーム</h2>
      </div>
      {/*tweetbox*/}
      <TweetBox></TweetBox>

      {/*post*/}
      <Switch onChange={changeOnlyMe}></Switch>自分の投稿だけ表示する
      <FlipMove>
      {posts.map((post)=>(
        onlyMe ?
        <Post 
          displayName={displayNames[post.email]}
          username={usernames[post.email]}
          //verified={post.verified}
          text={post.text}
          avatar={avatars[post.email]}
          image={post.image}
        ></Post> :
        post.email==email ?
        <Post 
          displayName={displayNames[post.email]}
          username={usernames[post.email]}
          //verified={post.verified}
          text={post.text}
          avatar={avatars[post.email]}
          image={post.image}
        ></Post>:
        <div></div>
      ))}
      </FlipMove>

    </div>
  )
}

export default Timeline
