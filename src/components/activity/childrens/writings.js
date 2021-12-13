import React from "react";
import { Fragment } from 'react';

export default function Writings({posts}){
  return [
    <Fragment key="writings-identifier">
      <div className="sub-title">
          LATEST WRITINGS
        </div>
      <div className="container">
        {posts.map((post) => {
          let postURL = `https://blog.gass.dev/post=${post.id}+no_scroll`;
          let date = post.created_at;
          date = date.slice(0,10);

          return [
          <a key={post.id} href={postURL} className="block" target="_blank" rel="noreferrer">
            <div className="date">
            {date}
            </div>
            <div className="post-title">
            {post.title}
            </div>
          </a>
          ]
        })}
      </div> 
    </Fragment>
  ]
}