import React, { forwardRef } from 'react'
import {Avatar} from "@mui/material"
import {VerifiedUser} from "@mui/icons-material"
import {ChatBubbleOutline} from "@mui/icons-material"
import {Repeat} from "@mui/icons-material"
import {FavoriteBorder} from "@mui/icons-material"
import {PublishOutlined} from "@mui/icons-material"
import "./Post.css"

const Post=forwardRef(({displayName,username,text,avatar,image},ref)=>{
  return (
    <div className='post' ref={ref}>
      <div className='post_avatar'>
        <Avatar src={avatar}></Avatar>
      </div>
      <div className="post_body">
        <div className='post_header'>
            <div className='post_headerText'>
                <h3>
                    {displayName}
                    <span className='post_headerSpecial'>
                        @{username}
                    </span>
                </h3>
            </div>
            <div className='post_headerDescription'>
                <p>{text}</p>
            </div>
        </div>
        <img src={image}></img>
        <div className='post_footer'>
            <ChatBubbleOutline fontSize='small'></ChatBubbleOutline>
            <Repeat fontSize='small'></Repeat>
            <FavoriteBorder fontSize='small'></FavoriteBorder>
            <PublishOutlined fontSize='small'></PublishOutlined>
        </div>
      </div>
    </div>
  )
});


export default Post
