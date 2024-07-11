import React, { useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import SidebarOption from "./SidebarOption";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from "@mui/icons-material/Search";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {Button, Input, TextField} from "@mui/material";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function Sidebar(){
  const [myUserName,setMyUserName]=useState();
  const [myDisplayName,setMyDisplayName]=useState();
  const [myImage,setMyImage]=useState();

  const [user,setUser]=useState([]);
  useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      
      setUser(currentUser);
    });
  },[]);

  const changeProfile=()=>{
    return 0;
  }

  return <div className="sidebar">
      {/* アイコン*/}
      <TwitterIcon className="sidebar_twittericon"></TwitterIcon>
      {/* Sidebar Option */}
      <SidebarOption text="ホーム" Icon={HomeIcon} active/>
      <SidebarOption text="話題を検索" Icon={SearchIcon} />
      <SidebarOption text="通知" Icon={NotificationsNoneIcon} />
      <SidebarOption text="メッセージ" Icon={MailOutlineIcon} />
      <SidebarOption text="ブックマーク" Icon={BookmarkBorderIcon} />
      <SidebarOption text="リスト" Icon={ListAltIcon} />
      <SidebarOption text="プロフィール" Icon={PermIdentityIcon} />
      <SidebarOption text="もっとみる" Icon={MoreHorizIcon} />

      <Button className="logOutButton" variant="contained" fullWidth onClick={()=>signOut(auth)}>ログアウト</Button>
  </div>;
}

export default Sidebar;