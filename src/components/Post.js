import React, { Component } from 'react';
import { Item, Image } from 'semantic-ui-react';

const Post = props => {
  return (
    <Item>
      <Item.Image size='tiny' src={props.image} />

      <Item.Content>
        <Item.Header as='a'>{props.title}</Item.Header>
        <Item.Description>{props.description}</Item.Description>
      </Item.Content>
    </Item>
  );
};

export default Post;
