import React from 'react'
import {Search} from '@mui/icons-material'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed } from 'react-twitter-embed';
import "./Widgets.css"

function Widgets() {
  return (
    <div className='widgets'>
      <div className='widgets_input'>
        <Search className='widgets_searchIcon'></Search>
        <input placeholder='キーワード検索' type='text'></input>
      </div>
      <div className='widgets_widgetContainer'>
        <h2>今どうしてる？</h2>
        <TwitterTweetEmbed
            tweetId={'1797011373077025169'}
        />
         <TwitterTimelineEmbed
            sourceType="profile"
            screenName="realmadridjapan"
            options={{height: 400}}
        />
        <TwitterShareButton
            url={'https://x.com/realmadridjapan'}
            options={{ text: '#マドリーおめでとう！', via: 'realmadridjapan' }}
        />
      </div>
    </div>
  )
}

export default Widgets
