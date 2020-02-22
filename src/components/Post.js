import React, { Component } from 'react';

const Post = props => {
  return (
    <div className='post'>
      <div
        style={{ backgroundImage: `url(${props.image}) ` }}
        className='post__image'
      ></div>
      <div className='post__info'>
        <h2 className='post__title'>{props.title}</h2>
        <div className='post__description'>{props.description}</div>
      </div>
    </div>
  );
};

export default Post;
